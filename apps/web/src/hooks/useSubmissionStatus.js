import { useState, useEffect, useRef } from "react";
import { getSubmissionStatus } from "../services/submissions.api.js";

/**
 * Custom React hook to poll the status of a CodeClash submission until completion.
 *
 * @param {string|null} submissionId
 * @param {object} [options]
 * @param {number} [options.pollInterval=1000]
 * @param {Function} [options.onComplete]
 * @returns {{ submission: object|null, isPolling: boolean, error: string|null }}
 */
export function useSubmissionStatus(submissionId, { pollInterval = 1000, onComplete } = {}) {
  const [submission, setSubmission] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState(null);
  const [prevId, setPrevId] = useState(submissionId);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  if (submissionId !== prevId) {
    setPrevId(submissionId);
    setSubmission(null);
    setIsPolling(Boolean(submissionId));
    setError(null);
  }

  useEffect(() => {
    if (!submissionId) return;

    let isMounted = true;
    let timerId = null;
    let consecutiveFailures = 0;

    const checkStatus = async () => {
      try {
        const data = await getSubmissionStatus(submissionId);
        if (!isMounted) return;

        setSubmission(data);
        setError(null);
        consecutiveFailures = 0;

        if (data.status === "COMPLETED") {
          setIsPolling(false);
          if (onCompleteRef.current) {
            onCompleteRef.current(data);
          }
          return; // Terminal state reached: stop polling
        }

        // Still QUEUED or RUNNING: schedule next poll
        setIsPolling(true);
        timerId = setTimeout(checkStatus, pollInterval);
      } catch (err) {
        if (!isMounted) return;

        consecutiveFailures++;
        console.warn(`[useSubmissionStatus] Polling attempt failed (${consecutiveFailures}):`, err.message);

        // If 403/404 or more than 5 consecutive failures, stop polling
        if (consecutiveFailures >= 5 || err.message?.includes("404") || err.message?.includes("403")) {
          setIsPolling(false);
          setError(err.message || "Failed to retrieve submission status");
        } else {
          // Retry with small backoff
          timerId = setTimeout(checkStatus, pollInterval * 2);
        }
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [submissionId, pollInterval]);

  return { submission, isPolling, error };
}

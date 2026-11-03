
import * as submissionsService from "../services/submissions.services.js";
import { executeRunCode } from "../services/run-code.service.js";

export async function runCode(req, res, next) {
  try {
    const { problemSlug, language, sourceCode } =
      res.locals.validatedBody;

    const result = await executeRunCode({
      problemSlug,
      language,
      sourceCode,
    });

    return res.status(200).json({
      result,
    });
  } catch (err) {
    return next(err);
  }
}

export async function submitCode(req, res, next) {
  try {
    const userId = req.user.id;
    const { problemSlug, language, sourceCode } =
      res.locals.validatedBody;

    const submission = await submissionsService.createSubmission({
      userId,
      problemSlug,
      language,
      sourceCode,
    });

    return res.status(202).json({
      submission: {
        id: submission.id,
        status: submission.status,
      },
    });
  } catch (err) {
    return next(err);
  }
}

export async function getSubmission(req, res, next) {
  try {
    const userId = req.user.id;
    const { id } = res.locals.validatedParams ?? req.params;

    const submission = await submissionsService.getSubmissionById({
      userId,
      submissionId: id,
    });

    return res.status(200).json({
      submission,
    });
  } catch (err) {
    return next(err);
  }
}

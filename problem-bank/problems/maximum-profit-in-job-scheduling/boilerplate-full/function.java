import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n_startTime = scanner.nextInt();
            int[] startTime = new int[n_startTime];
            for (int i = 0; i < n_startTime; i++) startTime[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_endTime = scanner.nextInt();
            int[] endTime = new int[n_endTime];
            for (int i = 0; i < n_endTime; i++) endTime[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_profit = scanner.nextInt();
            int[] profit = new int[n_profit];
            for (int i = 0; i < n_profit; i++) profit[i] = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.jobScheduling(startTime, endTime, profit);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int r_intervals = scanner.nextInt();
            int[][] intervals = new int[r_intervals][];
            for (int i = 0; i < r_intervals; i++) {
                int c = scanner.nextInt();
                intervals[i] = new int[c];
                for (int j = 0; j < c; j++) intervals[i][j] = scanner.nextInt();
            }
            if (!scanner.hasNext()) break;
            int n_queries = scanner.nextInt();
            int[] queries = new int[n_queries];
            for (int i = 0; i < n_queries; i++) queries[i] = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int[] result =
                solution.minInterval(intervals, queries);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            for (int i = 0; i < result.length; i++) {
                if (i > 0) System.out.print(" ");
                System.out.print(result[i]);
            }
            System.out.println();
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

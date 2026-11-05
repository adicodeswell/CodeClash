import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int numCourses = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int r_prerequisites = scanner.nextInt();
            int[][] prerequisites = new int[r_prerequisites][];
            for (int i = 0; i < r_prerequisites; i++) {
                int c = scanner.nextInt();
                prerequisites[i] = new int[c];
                for (int j = 0; j < c; j++) prerequisites[i][j] = scanner.nextInt();
            }
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            boolean result =
                solution.canFinish(numCourses, prerequisites);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result ? 1 : 0);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

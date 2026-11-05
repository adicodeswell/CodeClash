import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int r_matrix = scanner.nextInt();
            String[][] matrix = new String[r_matrix][];
            for (int i = 0; i < r_matrix; i++) {
                int c = scanner.nextInt();
                matrix[i] = new String[c];
                for (int j = 0; j < c; j++) matrix[i][j] = scanner.next();
            }
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.maximalRectangle(matrix);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

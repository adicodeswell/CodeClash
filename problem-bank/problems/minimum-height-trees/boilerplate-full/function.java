import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int r_edges = scanner.nextInt();
            int[][] edges = new int[r_edges][];
            for (int i = 0; i < r_edges; i++) {
                int c = scanner.nextInt();
                edges[i] = new int[c];
                for (int j = 0; j < c; j++) edges[i][j] = scanner.nextInt();
            }
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int[] result =
                solution.findMinHeightTrees(n, edges);
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

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int r_image = scanner.nextInt();
            int[][] image = new int[r_image][];
            for (int i = 0; i < r_image; i++) {
                int c = scanner.nextInt();
                image[i] = new int[c];
                for (int j = 0; j < c; j++) image[i][j] = scanner.nextInt();
            }
            if (!scanner.hasNext()) break;
            int sr = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int sc = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int color = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int[][] result =
                solution.floodFill(image, sr, sc, color);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[i].length; j++) {
                    if (j > 0) System.out.print(" ");
                    System.out.print(result[i][j]);
                }
                System.out.println();
            }
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
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
            int[] result =
                solution.findMinHeightTrees(n, edges);
            for (int i = 0; i < result.length; i++) {
                if (i > 0) System.out.print(" ");
                System.out.print(result[i]);
            }
            System.out.println();
        }
    }
}

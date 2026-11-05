import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int r_mat = scanner.nextInt();
            int[][] mat = new int[r_mat][];
            for (int i = 0; i < r_mat; i++) {
                int c = scanner.nextInt();
                mat[i] = new int[c];
                for (int j = 0; j < c; j++) mat[i][j] = scanner.nextInt();
            }
            Solution solution = new Solution();
            int[][] result =
                solution.updateMatrix(mat);
            for (int i = 0; i < result.length; i++) {
                for (int j = 0; j < result[i].length; j++) {
                    if (j > 0) System.out.print(" ");
                    System.out.print(result[i][j]);
                }
                System.out.println();
            }
        }
    }
}

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int r_accounts = scanner.nextInt();
            String[][] accounts = new String[r_accounts][];
            for (int i = 0; i < r_accounts; i++) {
                int c = scanner.nextInt();
                accounts[i] = new String[c];
                for (int j = 0; j < c; j++) accounts[i][j] = scanner.next();
            }
            Solution solution = new Solution();
            String[][] result =
                solution.accountsMerge(accounts);
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

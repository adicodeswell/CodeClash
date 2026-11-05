import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int r_accounts = scanner.nextInt();
            String[][] accounts = new String[r_accounts][];
            for (int i = 0; i < r_accounts; i++) {
                int c = scanner.nextInt();
                accounts[i] = new String[c];
                for (int j = 0; j < c; j++) accounts[i][j] = scanner.next();
            }
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            String[][] result =
                solution.accountsMerge(accounts);
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

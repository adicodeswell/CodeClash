import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n_root = scanner.nextInt();
            String[] root = new String[n_root];
            for (int i = 0; i < n_root; i++) root[i] = scanner.next();
            if (!scanner.hasNext()) break;
            int n_subRoot = scanner.nextInt();
            String[] subRoot = new String[n_subRoot];
            for (int i = 0; i < n_subRoot; i++) subRoot[i] = scanner.next();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            boolean result =
                solution.isSubtree(root, subRoot);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result ? 1 : 0);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n_p = scanner.nextInt();
            String[] p = new String[n_p];
            for (int i = 0; i < n_p; i++) p[i] = scanner.next();
            if (!scanner.hasNext()) break;
            int n_q = scanner.nextInt();
            String[] q = new String[n_q];
            for (int i = 0; i < n_q; i++) q[i] = scanner.next();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            boolean result =
                solution.isSameTree(p, q);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result ? 1 : 0);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

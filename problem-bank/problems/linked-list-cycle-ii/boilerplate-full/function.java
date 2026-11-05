import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n_head = scanner.nextInt();
            int[] head = new int[n_head];
            for (int i = 0; i < n_head; i++) head[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int pos = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.detectCycle(head, pos);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

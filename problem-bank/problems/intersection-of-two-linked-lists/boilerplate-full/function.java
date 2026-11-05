import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int intersectVal = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_listA = scanner.nextInt();
            int[] listA = new int[n_listA];
            for (int i = 0; i < n_listA; i++) listA[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_listB = scanner.nextInt();
            int[] listB = new int[n_listB];
            for (int i = 0; i < n_listB; i++) listB[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int skipA = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int skipB = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.getIntersectionNode(intersectVal, listA, listB, skipA, skipB);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

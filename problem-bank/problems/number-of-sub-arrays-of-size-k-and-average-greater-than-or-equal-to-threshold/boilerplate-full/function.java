import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int n_arr = scanner.nextInt();
            int[] arr = new int[n_arr];
            for (int i = 0; i < n_arr; i++) arr[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int k = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int threshold = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.numOfSubarrays(arr, k, threshold);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

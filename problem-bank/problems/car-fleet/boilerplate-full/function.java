import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        scanner.useLocale(Locale.US);
        long _cc_max_ns = 0;
        while (scanner.hasNext()) {
            int target = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_position = scanner.nextInt();
            int[] position = new int[n_position];
            for (int i = 0; i < n_position; i++) position[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_speed = scanner.nextInt();
            int[] speed = new int[n_speed];
            for (int i = 0; i < n_speed; i++) speed[i] = scanner.nextInt();
            Solution solution = new Solution();
            long _cc_t0 = System.nanoTime();
            int result =
                solution.carFleet(target, position, speed);
            long _cc_t1 = System.nanoTime();
            long _cc_dur = _cc_t1 - _cc_t0;
            if (_cc_dur > _cc_max_ns) _cc_max_ns = _cc_dur;
            System.out.println(result);
        }
        System.err.println("__CODECLASH_TIME_MS__:" + Math.max(1, Math.round(_cc_max_ns / 1000000.0)));
    }
}

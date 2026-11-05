import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int n_startTime = scanner.nextInt();
            int[] startTime = new int[n_startTime];
            for (int i = 0; i < n_startTime; i++) startTime[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_endTime = scanner.nextInt();
            int[] endTime = new int[n_endTime];
            for (int i = 0; i < n_endTime; i++) endTime[i] = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int n_profit = scanner.nextInt();
            int[] profit = new int[n_profit];
            for (int i = 0; i < n_profit; i++) profit[i] = scanner.nextInt();
            Solution solution = new Solution();
            int result =
                solution.jobScheduling(startTime, endTime, profit);
            System.out.println(result);
        }
    }
}

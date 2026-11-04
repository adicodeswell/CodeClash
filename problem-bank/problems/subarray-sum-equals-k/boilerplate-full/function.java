import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNextInt()) {
            int n_nums = scanner.nextInt();
            if (n_nums < 0) throw new IllegalArgumentException("Negative list length");
            int[] nums = new int[n_nums];
            for (int i = 0; i < n_nums; i++) nums[i] = scanner.nextInt();
            if (!scanner.hasNextInt()) break;
            int k = scanner.nextInt();
            Solution solution = new Solution();
            int result =
                solution.subarraySum(nums, k);
            System.out.println(result);
        }
    }
}

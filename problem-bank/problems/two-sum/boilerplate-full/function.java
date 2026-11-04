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
            int target = scanner.nextInt();
            Solution solution = new Solution();
            int[] result =
                solution.twoSum(nums, target);
            for (int i = 0; i < result.length; i++) {
                if (i > 0) System.out.print(" ");
                System.out.print(result[i]);
            }
            System.out.println();
        }
    }
}

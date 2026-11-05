import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int n_nums = scanner.nextInt();
            int[] nums = new int[n_nums];
            for (int i = 0; i < n_nums; i++) nums[i] = scanner.nextInt();
            Solution solution = new Solution();
            int result =
                solution.singleNumber(nums);
            System.out.println(result);
        }
    }
}

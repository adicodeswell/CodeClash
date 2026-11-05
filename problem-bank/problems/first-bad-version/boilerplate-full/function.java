import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int n = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int bad = scanner.nextInt();
            Solution solution = new Solution();
            int result =
                solution.firstBadVersion(n, bad);
            System.out.println(result);
        }
    }
}

import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String s = scanner.next();
            Solution solution = new Solution();
            int result =
                solution.myAtoi(s);
            System.out.println(result);
        }
    }
}

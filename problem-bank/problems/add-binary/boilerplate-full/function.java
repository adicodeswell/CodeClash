import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String a = scanner.next();
            if (!scanner.hasNext()) break;
            String b = scanner.next();
            Solution solution = new Solution();
            String result =
                solution.addBinary(a, b);
            System.out.println(result);
        }
    }
}

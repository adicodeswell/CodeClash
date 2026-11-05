import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String ransomNote = scanner.next();
            if (!scanner.hasNext()) break;
            String magazine = scanner.next();
            Solution solution = new Solution();
            boolean result =
                solution.canConstruct(ransomNote, magazine);
            System.out.println(result ? 1 : 0);
        }
    }
}

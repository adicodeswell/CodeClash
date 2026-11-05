import java.util.*;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            int n_root = scanner.nextInt();
            String[] root = new String[n_root];
            for (int i = 0; i < n_root; i++) root[i] = scanner.next();
            if (!scanner.hasNext()) break;
            int p = scanner.nextInt();
            if (!scanner.hasNext()) break;
            int q = scanner.nextInt();
            Solution solution = new Solution();
            int result =
                solution.lowestCommonAncestor(root, p, q);
            System.out.println(result);
        }
    }
}

#include <bits/stdc++.h>
using namespace std;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

int readInt() {
    int value;
    if (!(cin >> value)) throw runtime_error("Missing integer input");
    return value;
}

vector<int> readIntList() {
    int n = readInt();
    if (n < 0) throw runtime_error("Negative list length");
    vector<int> values(n);
    for (int &value : values) value = readInt();
    return values;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    auto nums = readIntList();
    Solution solution;
    auto result = solution.singleNumber(nums);
    cout << result << '\n';
    return 0;
}

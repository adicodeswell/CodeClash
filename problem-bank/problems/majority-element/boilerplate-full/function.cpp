#include <bits/stdc++.h>
using namespace std;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

bool readInt(int &value) {
    return bool(cin >> value);
}

bool readIntList(vector<int> &values) {
    int n;
    if (!(cin >> n)) return false;
    if (n < 0) throw runtime_error("Negative list length");
    values.resize(n);
    for (int &value : values) {
        if (!(cin >> value)) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    vector<int> nums;
    while (readIntList(nums)) {
        Solution solution;
        auto result = solution.majorityElement(nums);
        cout << result << '\n';
    }
    return 0;
}

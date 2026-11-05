#include <bits/stdc++.h>
using namespace std;

// Replace this marker with the participant's Solution class.
{{USER_CODE}}

bool readInt(int &v) { return bool(cin >> v); }
bool readLong(long long &v) { return bool(cin >> v); }
bool readDouble(double &v) { return bool(cin >> v); }
bool readBool(bool &v) { int b; if (cin >> b) { v = (b == 1); return true; } return false; }
bool readString(string &v) { return bool(cin >> v); }

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

bool readStringList(vector<string> &values) {
    int n;
    if (!(cin >> n)) return false;
    values.resize(n);
    for (string &value : values) {
        if (!(cin >> value)) return false;
    }
    return true;
}

bool readIntMatrix(vector<vector<int>> &mat) {
    int r;
    if (!(cin >> r)) return false;
    mat.resize(r);
    for (auto &row : mat) {
        int c;
        if (!(cin >> c)) return false;
        row.resize(c);
        for (int &x : row) if (!(cin >> x)) return false;
    }
    return true;
}

bool readStringMatrix(vector<vector<string>> &mat) {
    int r;
    if (!(cin >> r)) return false;
    mat.resize(r);
    for (auto &row : mat) {
        int c;
        if (!(cin >> c)) return false;
        row.resize(c);
        for (string &x : row) if (!(cin >> x)) return false;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int k;
    vector<int> arr;
    long long _cc_max_us = 0;
    while (readInt(k)) {
        if (!readIntList(arr)) break;
        Solution solution;
        auto _cc_t0 = chrono::high_resolution_clock::now();
        auto result = solution.maximumSumSubarray(k, arr);
        auto _cc_t1 = chrono::high_resolution_clock::now();
        long long _cc_dur = chrono::duration_cast<chrono::microseconds>(_cc_t1 - _cc_t0).count();
        if (_cc_dur > _cc_max_us) _cc_max_us = _cc_dur;
        cout << result << '\n';
    }
    cerr << "__CODECLASH_TIME_MS__:" << max(1LL, (_cc_max_us + 500) / 1000) << '\n';
    return 0;
}

#include <iostream>
#include <algorithm>
using namespace ::std;

int main()
{
    int n, m;
    cin >> n >> m;
    int ar[n], p[m], pre[m + 1];
    pair<int, int> g[m];
    for (int i = 0; i < n; i++)
        cin >> ar[i];
    for (int i = 0; i < m; i++)
        cin >> p[i] >> g[i].second, g[i].first = p[i];
    sort(g, g + m);
    sort(p, p + m);
    pre[0] = 0;
    for (int i = 1; i <= m; i++)
        pre[i] = pre[i - 1] + g[i - 1].second;
    for (int i = 0; i < n; i++)
        cout << pre[upper_bound(p, p + m, ar[i]) - p] << ' ';
}
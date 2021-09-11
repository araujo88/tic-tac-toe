#include <ctime>
#include <chrono>

using namespace std::chrono;
using namespace std;

int randomInt(int min, int max)
{
    auto t0 = chrono::high_resolution_clock::now();        
    auto t1 = t0.time_since_epoch();
    unsigned int seed = t1.count();
    //time_t seed = time(nullptr);
    srand(seed);
    if (min > max) 
        return min;
    return min + (rand() % (max - min + 1));
}
function startFindingPrimes(start,end){
    var primeCount= 0;
    for(var i=start;i<=end;i++)
        if (isPrime(i)) ++primeCount;
    var response = {
        primeCount : primeCount
    };
    self.postMessage(response);
}

function isPrime(n){
    if (n <= 3 ) return true;
    for(var i= 2;i<=(n/2);i++)
        if (n % i === 0) return false;
    return true;
}

self.addEventListener("message", onCallerMessage);
function onCallerMessage(msgEvt){
    console.log("message received from caller", msgEvt);
    var data = msgEvt.data;
    startFindingPrimes(data.start, data.end);
}

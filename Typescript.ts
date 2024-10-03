function rotateLeftByKPositions(s: string, k: number): string {
    
    let charArray: string[] = s.split('');
    
    
    k = k % charArray.length;
    

    function reverseArray(arr: string[], start: number, end: number): void {
        while (start < end) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    
    reverseArray(charArray, 0, k - 1);
    
    
    reverseArray(charArray, k, charArray.length - 1);
    
  
    reverseArray(charArray, 0, charArray.length - 1);
    
    
    return charArray.join('');
}


let s = "abcdef";
let k = 2;
console.log(rotateLeftByKPositions(s, k));

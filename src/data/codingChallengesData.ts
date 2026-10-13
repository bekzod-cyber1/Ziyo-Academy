import { CodeChallenge } from '../types';

export const CODE_CHALLENGES: CodeChallenge[] = [
  {
    id: 'ch-py-1',
    title: 'Palindrome So\'zni Tekshirish',
    language: 'python',
    difficulty: 'Oson (A1-A2)',
    description: "So'zning o'ngdan va chapdan bir xil o'qilishini (masalan: 'kiyik', 'level', 'radar') aniqlovchi dastur tuzing.",
    task: "is_palindrome(text) funksiyasi berilgan matn agar palindrom bo'lsa True, aks holda False qaytarsin.",
    starterCode: `def is_palindrome(text: str) -> bool:
    # Matnni kichik harfga o'tkazing va bo'shliqlarni olib tashlang
    cleaned = text.lower().replace(" ", "")
    # Kodingizni shu yerga yozing:
    return cleaned == cleaned[::-1]

# Test sinovi:
print(is_palindrome("kiyik"))
print(is_palindrome("ziyo"))
`,
    expectedOutput: `True\nFalse`,
    testCases: [
      { input: 'kiyik', expected: 'True' },
      { input: 'ziyo', expected: 'False' },
      { input: 'radar', expected: 'True' },
    ],
    solutionCode: `def is_palindrome(text: str) -> bool:\n    cleaned = text.lower().replace(" ", "")\n    return cleaned == cleaned[::-1]`,
    xp: 40,
  },
  {
    id: 'ch-js-1',
    title: 'Unikal Qiymatlar va Juft Sonlar Filtrlash',
    language: 'javascript',
    difficulty: "O'rta (B1)",
    description: "Massivdan takrorlangan qiymatlarni o'chirib, qolganlaridan faqat juft sonlarni o'sish tartibida saralang.",
    task: "filterAndSortUniqueEvens(arr) funksiyasini yozing. Kiruvchi: [7, 2, 4, 2, 9, 8, 4, 6] -> Chiqish: [2, 4, 6, 8]",
    starterCode: `function filterAndSortUniqueEvens(arr) {
  // Set yordamida takrorlanishlarni olib tashlang va filtrlash qiling:
  const unique = [...new Set(arr)];
  const evens = unique.filter(num => num % 2 === 0);
  return evens.sort((a, b) => a - b);
}

const input = [7, 2, 4, 2, 9, 8, 4, 6];
console.log(filterAndSortUniqueEvens(input));
`,
    expectedOutput: `[ 2, 4, 6, 8 ]`,
    testCases: [
      { input: '[7, 2, 4, 2, 9, 8, 4, 6]', expected: '[2, 4, 6, 8]' },
      { input: '[5, 3, 1]', expected: '[]' },
    ],
    solutionCode: `function filterAndSortUniqueEvens(arr) {\n  return [...new Set(arr)].filter(n => n % 2 === 0).sort((a, b) => a - b);\n}`,
    xp: 60,
  },
  {
    id: 'ch-cpp-1',
    title: 'Ikkilik Qidiruv (Binary Search) O(log N)',
    language: 'cpp',
    difficulty: 'Murakkab (B2)',
    description: "Tartiblangan massivda berilgan elementning indeksini logarifmik vaqt murakkabligida toping.",
    task: "binarySearch(arr, target) funksiyasi topilgan indeksni yoki agar mavjud bo'lmasa -1 ni qaytarsin.",
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> nums = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    int idx = binarySearch(nums, target);
    cout << "Topilgan indeks: " << idx << endl;
    return 0;
}
`,
    expectedOutput: `Topilgan indeks: 5`,
    testCases: [
      { input: 'nums: [2..91], target: 23', expected: '5' },
      { input: 'target: 999', expected: '-1' },
    ],
    solutionCode: `int binarySearch(const vector<int>& arr, int target) {\n    int l = 0, r = arr.size() - 1;\n    while(l <= r) {\n        int m = l + (r - l) / 2;\n        if(arr[m] == target) return m;\n        if(arr[m] < target) l = m + 1; else r = m - 1;\n    }\n    return -1;\n}`,
    xp: 80,
  },
];

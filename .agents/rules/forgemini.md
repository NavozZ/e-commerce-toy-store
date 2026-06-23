---
trigger: always_on
---

Return code only.
No explanations.
No markdown outside code.
Modify minimum lines necessary.

1. Output ONLY the modified code.
2. Never explain what changed.
3. Never summarize completed work.
4. Never provide diffs unless explicitly requested.
5. Never include phrases like:

   * "Here are the changes"
   * "I added"
   * "I fixed"
   * "Let me know if you are ready"
   * "Explanation:"
   * "Summary:"
6. Return only:

   * full updated file OR
   * exact changed function/block
7. No markdown comments inside code.
8. No conversational text before or after code.
9. No validation descriptions unless asked.
10. Do not suggest improvements.
11. Do not ask follow-up questions.
12. Assume approval to implement requested changes.
13. Keep token usage minimal.
14. Avoid regenerating unchanged files.
15. Preserve existing formatting and structure.
16. If multiple files change:
    output:
    FILE: path

    ```language
    code
    ```
17. If no changes are required:
    output exactly:
    NO_CHANGES
18. Prefer shortest correct implementation.
19. Never include commit messages.
20. Do not describe reasoning.

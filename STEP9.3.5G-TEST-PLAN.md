# MORE 9.3.5G — Group Projects Test Plan

1. Run `npm.cmd run migrate:up` and verify migration `1727000028000_group_projects.sql` applies.
2. Run `npm.cmd run typecheck` on the Windows development machine.
3. Start MORE.
4. Login as Student A and open an incomplete, unlocked skill level.
5. Confirm **Group project** appears under the level.
6. Search students from other sections/classes in the same school.
7. Select exactly 1 other learner and create the group — total should be 2 and creation should succeed.
8. Create another test with up to 20 total members. MORE must stop selection above 20.
9. Confirm a student from another school never appears.
10. Confirm a learner already completing the level cannot be selected/added.
11. Confirm a learner already in another group for the same level cannot join a second group.
12. Login as Teacher and open **Group Activities**.
13. Confirm the new group is visible as **Needs review** and the pending notification count increases.
14. Open the group and verify all names, grades, sections and student IDs.
15. Upload one project photo, enter marks (for example 85/100), XP and a teacher note.
16. Click **Complete group for all students** only once.
17. Confirm the group becomes Reviewed and cannot award XP a second time.
18. Login as every group member and confirm:
    - Level is completed.
    - Same evidence photo appears.
    - Same marks appear.
    - Same XP is awarded.
    - Project appears in individual portfolio/latest projects.
    - Next stage/level logic continues normally.
19. Check student XP totals and levels-completed counters increased only once.
20. Test creator cancellation before teacher review; cancelled members should be able to create/join another group for that level.
21. Regression test individual project review to confirm it still works unchanged.
22. Regression test Founder, Principal, Quotations/POs, billing and marketplace screens.

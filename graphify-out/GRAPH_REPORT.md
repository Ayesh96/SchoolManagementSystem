# Graph Report - SchoolManagementSystem  (2026-10-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1339 nodes · 2474 edges · 79 communities (76 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c24deee`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38
- Community 39
- Community 40
- Community 41
- Community 42
- Community 43
- Community 44
- Community 45
- Community 46
- Community 47
- Community 48
- Community 49
- Community 50
- Community 51
- Community 52
- Community 53
- Community 54
- Community 55
- Community 56
- Community 57
- Community 58
- Community 59
- Community 60
- Community 61
- Community 62
- Community 63
- Community 64
- Community 65
- Community 66
- Community 67
- Community 68
- Community 69
- Community 70
- Community 71
- Community 72
- Community 73
- Community 74
- Community 75
- Community 76
- Community 77
- Community 78

## God Nodes (most connected - your core abstractions)
1. `cn()` - 273 edges
2. `customFetch()` - 30 edges
3. `FeesPage()` - 27 edges
4. `StudentsPage()` - 25 edges
5. `TeachersPage()` - 23 edges
6. `lucide-react` - 23 edges
7. `compilerOptions` - 23 edges
8. `ClassroomsPage()` - 22 edges
9. `TimetablePage()` - 19 edges
10. `Field()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `AccordionContent` --calls--> `cn()`  [EXTRACTED]
  frontend/src/components/ui/accordion.tsx → frontend/src/lib/utils.ts
- `AccordionItem` --calls--> `cn()`  [EXTRACTED]
  frontend/src/components/ui/accordion.tsx → frontend/src/lib/utils.ts
- `AccordionTrigger` --calls--> `cn()`  [EXTRACTED]
  frontend/src/components/ui/accordion.tsx → frontend/src/lib/utils.ts
- `AlertDescription` --calls--> `cn()`  [EXTRACTED]
  frontend/src/components/ui/alert.tsx → frontend/src/lib/utils.ts
- `AlertTitle` --calls--> `cn()`  [EXTRACTED]
  frontend/src/components/ui/alert.tsx → frontend/src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (79 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (71): Awaited, AwaitedInput, CreateClassroomMutationBody, CreateClassroomMutationError, CreateClassroomMutationResult, CreateClassroomMutationVariables, CreateFeeMutationBody, CreateFeeMutationError (+63 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (54): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+46 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (61): devDependencies, class-variance-authority, clsx, cmdk, date-fns, embla-carousel-react, framer-motion, @hookform/resolvers (+53 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (29): Classroom, ClassroomInput, ClassroomList, ClassroomUpdate, DashboardSummary, ErrorResponse, FeePayment, FeePaymentInput (+21 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (15): Avatar(), classroomFormSchema, emailValue, feeFormSchema, FieldProps, initials(), navItems, paymentFormSchema (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (54): createClassroomBodyCapacityMax, createClassroomBodyGradeMax, createClassroomBodyNameMax, createClassroomBodyRoomNameMax, createFeeBodyAmountDueMin, createFeeBodyTermMax, createFeePaymentBodyAmountMin, createFeePaymentBodyNoteMax (+46 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (37): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (30): Avatar, AvatarFallback, AvatarImage, HoverCardContent, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton() (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (25): Classroom, classroomsTable, InsertClassroom, insertClassroomSchema, FeePayment, feePaymentsTable, InsertFeePayment, insertFeePaymentSchema (+17 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (29): ApiError, applyBaseUrl(), AuthTokenGetter, BodyType, buildErrorMessage(), customFetch(), CustomFetchOptions, ErrorType (+21 more)

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (27): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator(), ButtonGroup() (+19 more)

### Community 11 - "Community 11"
Cohesion: 0.21
Nodes (30): getListClassroomsQueryKey(), getListClassroomsQueryOptions(), getListTimetableEntriesQueryKey(), getListTimetableEntriesQueryOptions(), useListClassrooms(), useListTimetableEntries(), Button(), ClassroomCapacityPreview() (+22 more)

### Community 12 - "Community 12"
Cohesion: 0.07
Nodes (29): Classroom, ClassroomInput, ClassroomList, ClassroomUpdate, DashboardSummary, ErrorResponse, FeePayment, FeePaymentInput (+21 more)

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (25): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+17 more)

### Community 14 - "Community 14"
Cohesion: 0.08
Nodes (16): CreateStudentBody, CreateStudentResponse, HealthCheckResponse, ListStudentsResponse, UpdateStudentBody, UpdateStudentParams, UpdateStudentResponse, toDateOnlyString() (+8 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (23): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+15 more)

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (19): AccordionContent, AccordionItem, AccordionTrigger, Checkbox, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot (+11 more)

### Community 17 - "Community 17"
Cohesion: 0.08
Nodes (23): compilerOptions, alwaysStrict, customConditions, incremental, isolatedModules, lib, module, moduleResolution (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.09
Nodes (11): CreateFeeBody, CreateFeePaymentBody, CreateFeePaymentParams, CreateFeePaymentResponse, CreateFeeResponse, ListFeePaymentsParams, ListFeePaymentsResponse, ListFeesResponse (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.13
Nodes (13): GetDashboardResponse, getFeeData(), getPaymentStatus(), getStudentData(), getTeacherData(), listFeeData(), listFeePaymentData(), listStudentData() (+5 more)

### Community 20 - "Community 20"
Cohesion: 0.13
Nodes (21): Field(), FormControl, FormDescription, FormField(), FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+13 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (19): react, zod, name, private, type, version, date-fns, framer-motion (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.14
Nodes (15): Alert, AlertDescription, AlertTitle, alertVariants, Badge(), BadgeProps, badgeVariants, ToggleGroup (+7 more)

### Community 23 - "Community 23"
Cohesion: 0.13
Nodes (16): Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+8 more)

### Community 24 - "Community 24"
Cohesion: 0.12
Nodes (12): apiClientReactSrc, apiZodSrc, root, devDependencies, orval, name, private, scripts (+4 more)

### Community 25 - "Community 25"
Cohesion: 0.13
Nodes (10): CreateTimetableEntryBody, CreateTimetableEntryResponse, ListTimetableEntriesResponse, UpdateTimetableEntryBody, UpdateTimetableEntryParams, UpdateTimetableEntryResponse, getClassroomTeacherId(), getTimetableData() (+2 more)

### Community 26 - "Community 26"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 27 - "Community 27"
Cohesion: 0.15
Nodes (8): App(), Router(), ErrorBoundary, ErrorBoundaryProps, ErrorBoundaryState, ErrorFallbackProps, toError(), react-dom

### Community 28 - "Community 28"
Cohesion: 0.13
Nodes (8): CreateClassroomBody, CreateClassroomResponse, ListClassroomsResponse, UpdateClassroomBody, UpdateClassroomParams, UpdateClassroomResponse, getClassroomData(), listClassroomData()

### Community 29 - "Community 29"
Cohesion: 0.12
Nodes (15): devDependencies, prettier, typescript, license, name, packageManager, private, scripts (+7 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (14): drizzle-orm, @types/node, devDependencies, drizzle-kit, @types/node, @types/pg, exports, ./schema (+6 more)

### Community 31 - "Community 31"
Cohesion: 0.17
Nodes (14): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+6 more)

### Community 32 - "Community 32"
Cohesion: 0.17
Nodes (13): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSet() (+5 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (13): name, private, type, version, cookie-parser, pino, pino-pretty, thread-stream (+5 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (7): app, port, logger, router, cors, pino-http, @sentry/node

### Community 35 - "Community 35"
Cohesion: 0.15
Nodes (6): CreateTeacherBody, CreateTeacherResponse, ListTeachersResponse, UpdateTeacherBody, UpdateTeacherParams, UpdateTeacherResponse

### Community 36 - "Community 36"
Cohesion: 0.17
Nodes (11): @tanstack/react-query, dependencies, @tanstack/react-query, exports, react, name, peerDependencies, react (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.24
Nodes (11): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent, getPayloadConfigFromPayload() (+3 more)

### Community 38 - "Community 38"
Cohesion: 0.22
Nodes (6): "classrooms", "fee_payments", "fee_records", "students", "teachers", "timetable_entries"

### Community 39 - "Community 39"
Cohesion: 0.20
Nodes (10): dependencies, cookie-parser, cors, drizzle-orm, express, pino, pino-http, @sentry/node (+2 more)

### Community 40 - "Community 40"
Cohesion: 0.20
Nodes (9): compilerOptions, incremental, outDir, rootDir, tsBuildInfoFile, types, extends, include (+1 more)

### Community 41 - "Community 41"
Cohesion: 0.20
Nodes (9): compilerOptions, composite, declarationMap, emitDeclarationOnly, outDir, rootDir, types, extends (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.20
Nodes (10): getListFeesQueryKey(), getListFeesQueryOptions(), getListStudentsQueryKey(), getListStudentsQueryOptions(), useGetDashboard(), useListFeePayments(), useListFees(), useListStudents() (+2 more)

### Community 43 - "Community 43"
Cohesion: 0.22
Nodes (3): artifactDir, esbuild, esbuild-plugin-pino

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (9): devDependencies, esbuild, esbuild-plugin-pino, pino-pretty, thread-stream, @types/cookie-parser, @types/cors, @types/express (+1 more)

### Community 45 - "Community 45"
Cohesion: 0.22
Nodes (8): dependencies, zod, exports, zod, name, private, type, version

### Community 46 - "Community 46"
Cohesion: 0.33
Nodes (7): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, NotFound()

### Community 47 - "Community 47"
Cohesion: 0.25
Nodes (7): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle, vaul

### Community 48 - "Community 48"
Cohesion: 0.28
Nodes (8): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport, @radix-ui/react-navigation-menu

### Community 49 - "Community 49"
Cohesion: 0.22
Nodes (9): compilerOptions, allowImportingTsExtensions, jsx, lib, moduleResolution, noEmit, paths, resolveJsonModule (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.29
Nodes (5): extends, include, extends, include, ./tsconfig.base.json

### Community 51 - "Community 51"
Cohesion: 0.29
Nodes (7): compilerOptions, composite, declarationMap, emitDeclarationOnly, lib, outDir, rootDir

### Community 52 - "Community 52"
Cohesion: 0.33
Nodes (6): compilerOptions, composite, declarationMap, emitDeclarationOnly, outDir, rootDir

### Community 53 - "Community 53"
Cohesion: 0.40
Nodes (5): scripts, build, dev, start, typecheck

### Community 54 - "Community 54"
Cohesion: 0.40
Nodes (5): dependencies, drizzle-orm, drizzle-zod, pg, zod

### Community 55 - "Community 55"
Cohesion: 0.40
Nodes (5): scripts, generate, migrate, push, push-force

### Community 56 - "Community 56"
Cohesion: 0.40
Nodes (5): scripts, build, dev, serve, typecheck

### Community 57 - "Community 57"
Cohesion: 0.40
Nodes (5): createClassroom(), getCreateClassroomMutationKey(), getCreateClassroomMutationOptions(), getCreateClassroomUrl(), useCreateClassroom()

### Community 58 - "Community 58"
Cohesion: 0.40
Nodes (5): createFee(), getCreateFeeMutationKey(), getCreateFeeMutationOptions(), getCreateFeeUrl(), useCreateFee()

### Community 59 - "Community 59"
Cohesion: 0.40
Nodes (5): createFeePayment(), getCreateFeePaymentMutationKey(), getCreateFeePaymentMutationOptions(), getCreateFeePaymentUrl(), useCreateFeePayment()

### Community 60 - "Community 60"
Cohesion: 0.40
Nodes (5): createStudent(), getCreateStudentMutationKey(), getCreateStudentMutationOptions(), getCreateStudentUrl(), useCreateStudent()

### Community 61 - "Community 61"
Cohesion: 0.40
Nodes (5): createTeacher(), getCreateTeacherMutationKey(), getCreateTeacherMutationOptions(), getCreateTeacherUrl(), useCreateTeacher()

### Community 62 - "Community 62"
Cohesion: 0.40
Nodes (5): createTimetableEntry(), getCreateTimetableEntryMutationKey(), getCreateTimetableEntryMutationOptions(), getCreateTimetableEntryUrl(), useCreateTimetableEntry()

### Community 63 - "Community 63"
Cohesion: 0.40
Nodes (5): getHealthCheckQueryKey(), getHealthCheckQueryOptions(), getHealthCheckUrl(), healthCheck(), useHealthCheck()

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (5): getUpdateClassroomMutationKey(), getUpdateClassroomMutationOptions(), getUpdateClassroomUrl(), updateClassroom(), useUpdateClassroom()

### Community 65 - "Community 65"
Cohesion: 0.40
Nodes (5): getUpdateFeeMutationKey(), getUpdateFeeMutationOptions(), getUpdateFeeUrl(), updateFee(), useUpdateFee()

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (5): getUpdateStudentMutationKey(), getUpdateStudentMutationOptions(), getUpdateStudentUrl(), updateStudent(), useUpdateStudent()

### Community 67 - "Community 67"
Cohesion: 0.40
Nodes (5): getUpdateTeacherMutationKey(), getUpdateTeacherMutationOptions(), getUpdateTeacherUrl(), updateTeacher(), useUpdateTeacher()

### Community 68 - "Community 68"
Cohesion: 0.40
Nodes (5): getUpdateTimetableEntryMutationKey(), getUpdateTimetableEntryMutationOptions(), getUpdateTimetableEntryUrl(), updateTimetableEntry(), useUpdateTimetableEntry()

### Community 69 - "Community 69"
Cohesion: 0.40
Nodes (3): ToasterProps, next-themes, sonner

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (4): exclude, extends, include, references

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (4): port, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 72 - "Community 72"
Cohesion: 0.40
Nodes (4): compileOnSave, extends, files, references

### Community 73 - "Community 73"
Cohesion: 0.50
Nodes (4): getDashboard(), getGetDashboardQueryKey(), getGetDashboardQueryOptions(), getGetDashboardUrl()

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (4): getListFeePaymentsQueryKey(), getListFeePaymentsQueryOptions(), getListFeePaymentsUrl(), listFeePayments()

### Community 75 - "Community 75"
Cohesion: 0.50
Nodes (4): getListTeachersQueryKey(), getListTeachersQueryOptions(), getListTeachersUrl(), listTeachers()

## Knowledge Gaps
- **25 isolated node(s):** `react`, `zod`, `date-fns`, `framer-motion`, `react-icons` (+20 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 568 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 32`, `Community 37`, `Community 6`, `Community 7`, `Community 10`, `Community 13`, `Community 46`, `Community 15`, `Community 16`, `Community 47`, `Community 48`, `Community 20`, `Community 22`, `Community 23`, `Community 31`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **What connects `react`, `zod`, `date-fns` to the rest of the system?**
  _25 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.029342723004694836 - nodes in this community are weakly interconnected._
- **Why does `@types/node` connect `Community 30` to `Community 33`, `Community 21`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05314685314685315 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Community 2` to `Community 21`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03278688524590164 - nodes in this community are weakly interconnected._
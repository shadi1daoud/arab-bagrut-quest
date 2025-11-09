# Darsni Backend Architecture

## Overview
This document outlines the complete backend structure required for the Darsni learning platform, including database entities, relationships, API controllers, and security policies.

---

## 1. Database Entities (Tables)

### 1.1 Authentication & User Management

#### `profiles`
Core user profile information.
```sql
- id: uuid (PK, references auth.users)
- full_name: text
- display_name: text
- avatar_url: text
- bio: text
- grade_level: text
- school: text
- created_at: timestamptz
- updated_at: timestamptz
```

#### `user_roles`
Role-based access control (RBAC).
```sql
- id: uuid (PK)
- user_id: uuid (FK -> auth.users)
- role: app_role enum ('admin', 'student', 'teacher')
- created_at: timestamptz
- unique(user_id, role)
```

#### `waitlist`
Pre-launch signup tracking (already exists).
```sql
- id: uuid (PK)
- name: text
- email: text (unique)
- user_type: text
- school: text
- created_at: timestamptz
```

---

### 1.2 Gamification & Progress

#### `user_progress`
Tracks XP, levels, coins, streaks.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles, unique)
- total_xp: integer (default: 0)
- level: integer (default: 1)
- coins: integer (default: 0)
- current_streak: integer (default: 0)
- longest_streak: integer (default: 0)
- last_activity_date: date
- created_at: timestamptz
- updated_at: timestamptz
```

#### `xp_transactions`
Log of all XP gains/losses.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- amount: integer
- reason: text (e.g., 'quiz_completed', 'video_watched', 'daily_login')
- reference_id: uuid (optional, links to course/quiz/etc)
- created_at: timestamptz
```

#### `achievements`
Available achievements in the system.
```sql
- id: uuid (PK)
- title_en: text
- title_ar: text
- description_en: text
- description_ar: text
- icon: text
- xp_reward: integer
- coin_reward: integer
- requirement_type: text (e.g., 'streak', 'courses_completed', 'xp_earned')
- requirement_value: integer
- created_at: timestamptz
```

#### `user_achievements`
Tracks which achievements users have unlocked.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- achievement_id: uuid (FK -> achievements)
- unlocked_at: timestamptz
- unique(user_id, achievement_id)
```

#### `leaderboard`
Materialized view or table for performance.
```sql
- user_id: uuid (FK -> profiles)
- rank: integer
- total_xp: integer
- weekly_xp: integer
- week_start: date
- updated_at: timestamptz
```

---

### 1.3 Course Management

#### `subjects`
Subject categories (Math, Science, etc.).
```sql
- id: uuid (PK)
- name_en: text
- name_ar: text
- color: text (hex color)
- icon: text
- order: integer
- created_at: timestamptz
```

#### `courses`
Main course entities.
```sql
- id: uuid (PK)
- subject_id: uuid (FK -> subjects)
- title_en: text
- title_ar: text
- description_en: text
- description_ar: text
- grade_level: text
- thumbnail_url: text
- difficulty: text ('beginner', 'intermediate', 'advanced')
- estimated_hours: integer
- total_xp: integer
- is_published: boolean (default: false)
- created_by: uuid (FK -> profiles)
- created_at: timestamptz
- updated_at: timestamptz
```

#### `course_units`
Units/chapters within courses.
```sql
- id: uuid (PK)
- course_id: uuid (FK -> courses)
- title_en: text
- title_ar: text
- description_en: text
- description_ar: text
- order: integer
- duration_minutes: integer
- xp_reward: integer
- created_at: timestamptz
```

#### `course_lessons`
Individual lessons within units.
```sql
- id: uuid (PK)
- unit_id: uuid (FK -> course_units)
- title_en: text
- title_ar: text
- content_type: text ('video', 'reading', 'interactive', 'quiz')
- video_url: text
- content_en: text (markdown/html)
- content_ar: text (markdown/html)
- order: integer
- duration_minutes: integer
- xp_reward: integer
- created_at: timestamptz
```

#### `lesson_materials`
Additional resources for lessons.
```sql
- id: uuid (PK)
- lesson_id: uuid (FK -> course_lessons)
- title_en: text
- title_ar: text
- type: text ('pdf', 'video', 'link', 'image')
- url: text
- file_path: text (for storage bucket)
- order: integer
- created_at: timestamptz
```

---

### 1.4 Assessments

#### `quizzes`
Quiz definitions.
```sql
- id: uuid (PK)
- lesson_id: uuid (FK -> course_lessons, nullable)
- course_id: uuid (FK -> courses, nullable)
- title_en: text
- title_ar: text
- description_en: text
- description_ar: text
- type: text ('mini', 'unit', 'final', 'daily', 'weekly')
- time_limit_minutes: integer
- passing_score: integer
- xp_reward: integer
- coin_reward: integer
- created_at: timestamptz
```

#### `quiz_questions`
Individual questions.
```sql
- id: uuid (PK)
- quiz_id: uuid (FK -> quizzes)
- question_en: text
- question_ar: text
- type: text ('multiple_choice', 'true_false', 'fill_blank')
- image_url: text
- points: integer
- order: integer
- created_at: timestamptz
```

#### `quiz_answers`
Answer options for questions.
```sql
- id: uuid (PK)
- question_id: uuid (FK -> quiz_questions)
- answer_en: text
- answer_ar: text
- is_correct: boolean
- order: integer
```

#### `quiz_attempts`
User quiz submissions.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- quiz_id: uuid (FK -> quizzes)
- score: integer
- total_points: integer
- time_taken_seconds: integer
- xp_earned: integer
- coins_earned: integer
- completed_at: timestamptz
- created_at: timestamptz
```

#### `quiz_responses`
Individual answers per attempt.
```sql
- id: uuid (PK)
- attempt_id: uuid (FK -> quiz_attempts)
- question_id: uuid (FK -> quiz_questions)
- answer_id: uuid (FK -> quiz_answers)
- is_correct: boolean
- created_at: timestamptz
```

---

### 1.5 User Progress Tracking

#### `course_enrollments`
Which courses users are taking.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- course_id: uuid (FK -> courses)
- status: text ('enrolled', 'in_progress', 'completed', 'dropped')
- progress_percentage: integer (default: 0)
- enrolled_at: timestamptz
- completed_at: timestamptz
- last_accessed_at: timestamptz
- unique(user_id, course_id)
```

#### `lesson_progress`
Tracks lesson completion.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- lesson_id: uuid (FK -> course_lessons)
- status: text ('not_started', 'in_progress', 'completed')
- video_progress_seconds: integer
- completed_at: timestamptz
- unique(user_id, lesson_id)
```

#### `unit_progress`
Tracks unit completion.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- unit_id: uuid (FK -> course_units)
- status: text ('idle', 'in_progress', 'completed')
- has_streak: boolean (default: false)
- completed_at: timestamptz
- unique(user_id, unit_id)
```

---

### 1.6 Social Features

#### `friendships`
User connections.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- friend_id: uuid (FK -> profiles)
- status: text ('pending', 'accepted', 'blocked')
- created_at: timestamptz
- accepted_at: timestamptz
- unique(user_id, friend_id)
```

#### `student_of_week`
Weekly featured student.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- week_start: date
- reason_en: text
- reason_ar: text
- created_at: timestamptz
```

#### `community_posts`
User-generated content.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- title: text
- content: text
- type: text ('question', 'achievement', 'tip', 'discussion')
- likes_count: integer (default: 0)
- comments_count: integer (default: 0)
- is_pinned: boolean (default: false)
- created_at: timestamptz
- updated_at: timestamptz
```

#### `post_likes`
Track post likes.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- post_id: uuid (FK -> community_posts)
- created_at: timestamptz
- unique(user_id, post_id)
```

#### `post_comments`
Comments on posts.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- post_id: uuid (FK -> community_posts)
- content: text
- created_at: timestamptz
- updated_at: timestamptz
```

---

### 1.7 Shop & Rewards

#### `shop_items`
Items available for purchase.
```sql
- id: uuid (PK)
- name_en: text
- name_ar: text
- description_en: text
- description_ar: text
- type: text ('avatar', 'badge', 'theme', 'powerup', 'cosmetic')
- price_coins: integer
- image_url: text
- is_available: boolean (default: true)
- created_at: timestamptz
```

#### `user_inventory`
Items users have purchased.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- item_id: uuid (FK -> shop_items)
- is_equipped: boolean (default: false)
- purchased_at: timestamptz
- unique(user_id, item_id)
```

#### `coin_transactions`
Log of coin gains/spends.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- amount: integer
- type: text ('earned', 'spent', 'bonus')
- reason: text
- reference_id: uuid
- created_at: timestamptz
```

---

### 1.8 Engagement Systems

#### `daily_quests`
Daily challenges.
```sql
- id: uuid (PK)
- title_en: text
- title_ar: text
- description_en: text
- description_ar: text
- requirement_type: text ('complete_lessons', 'earn_xp', 'complete_quiz')
- requirement_value: integer
- xp_reward: integer
- coin_reward: integer
- date: date
- created_at: timestamptz
```

#### `user_daily_quests`
User quest progress.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- quest_id: uuid (FK -> daily_quests)
- progress: integer (default: 0)
- is_completed: boolean (default: false)
- completed_at: timestamptz
- unique(user_id, quest_id)
```

#### `notifications`
User notifications.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- title_en: text
- title_ar: text
- message_en: text
- message_ar: text
- type: text ('achievement', 'quest', 'friend_request', 'course', 'system')
- is_read: boolean (default: false)
- action_url: text
- created_at: timestamptz
```

#### `announcements`
System-wide announcements.
```sql
- id: uuid (PK)
- title_en: text
- title_ar: text
- message_en: text
- message_ar: text
- priority: text ('low', 'medium', 'high')
- target_audience: text ('all', 'students', 'teachers', 'admins')
- is_active: boolean (default: true)
- expires_at: timestamptz
- created_at: timestamptz
```

---

### 1.9 Analytics & Insights

#### `user_activity_log`
Track user actions for analytics.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- action_type: text
- resource_type: text
- resource_id: uuid
- metadata: jsonb
- created_at: timestamptz
```

#### `weekly_goals`
User-set weekly goals.
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- week_start: date
- goal_type: text ('xp', 'lessons', 'quizzes', 'streak')
- target_value: integer
- current_value: integer (default: 0)
- is_achieved: boolean (default: false)
- created_at: timestamptz
```

---

## 2. Database Functions & Triggers

### 2.1 Auto-update Functions

```sql
-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to relevant tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 XP & Level Calculation

```sql
-- Calculate level from XP
CREATE OR REPLACE FUNCTION calculate_level(xp integer)
RETURNS integer AS $$
BEGIN
    RETURN floor(power(xp / 100.0, 0.5)) + 1;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update user level on XP change
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
    NEW.level = calculate_level(NEW.total_xp);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_level_on_xp_change
    BEFORE UPDATE OF total_xp ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_user_level();
```

### 2.3 Streak Management

```sql
-- Update streak on activity
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.last_activity_date IS NULL OR 
       NEW.last_activity_date < CURRENT_DATE THEN
        
        -- Check if last activity was yesterday
        IF NEW.last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
            NEW.current_streak = NEW.current_streak + 1;
        ELSE
            NEW.current_streak = 1;
        END IF;
        
        -- Update longest streak
        IF NEW.current_streak > NEW.longest_streak THEN
            NEW.longest_streak = NEW.current_streak;
        END IF;
        
        NEW.last_activity_date = CURRENT_DATE;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER maintain_user_streak
    BEFORE UPDATE ON user_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_user_streak();
```

### 2.4 Security Definer Functions

```sql
-- Check user role (for RLS policies)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
$$;

-- Get current user's ID safely
CREATE OR REPLACE FUNCTION public.current_user_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT auth.uid();
$$;
```

---

## 3. Row-Level Security (RLS) Policies

### 3.1 Profiles

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view all profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);
```

### 3.2 User Progress

```sql
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
    ON user_progress FOR SELECT
    USING (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
    ON user_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert own progress"
    ON user_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);
```

### 3.3 Courses (Public Read, Admin Write)

```sql
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Everyone can view published courses
CREATE POLICY "Published courses are viewable by everyone"
    ON courses FOR SELECT
    USING (is_published = true OR auth.uid() = created_by);

-- Only admins can create courses
CREATE POLICY "Admins can create courses"
    ON courses FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update courses
CREATE POLICY "Admins can update courses"
    ON courses FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete courses
CREATE POLICY "Admins can delete courses"
    ON courses FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));
```

### 3.4 Course Enrollments

```sql
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Users can view their own enrollments
CREATE POLICY "Users can view own enrollments"
    ON course_enrollments FOR SELECT
    USING (auth.uid() = user_id);

-- Users can enroll themselves
CREATE POLICY "Users can enroll themselves"
    ON course_enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own enrollments
CREATE POLICY "Users can update own enrollments"
    ON course_enrollments FOR UPDATE
    USING (auth.uid() = user_id);
```

### 3.5 Quiz Attempts

```sql
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Users can view their own attempts
CREATE POLICY "Users can view own attempts"
    ON quiz_attempts FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own attempts
CREATE POLICY "Users can create own attempts"
    ON quiz_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins can view all attempts
CREATE POLICY "Admins can view all attempts"
    ON quiz_attempts FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));
```

### 3.6 Community Posts

```sql
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

-- Everyone can view posts
CREATE POLICY "Posts are viewable by everyone"
    ON community_posts FOR SELECT
    USING (true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
    ON community_posts FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
    ON community_posts FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
    ON community_posts FOR DELETE
    USING (auth.uid() = user_id);
```

---

## 4. Storage Buckets

### 4.1 Profile Avatars

```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true);

-- Anyone can view avatars
CREATE POLICY "Avatars are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- Users can upload their own avatar
CREATE POLICY "Users can upload own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );
```

### 4.2 Course Content

```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('course-content', 'course-content', true);

-- Anyone can view course content
CREATE POLICY "Course content is publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'course-content');

-- Only admins can upload course content
CREATE POLICY "Admins can upload course content"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'course-content' AND
        public.has_role(auth.uid(), 'admin')
    );
```

### 4.3 Lesson Materials

```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lesson-materials', 'lesson-materials', true);

-- Anyone can view lesson materials
CREATE POLICY "Lesson materials are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'lesson-materials');

-- Only admins can manage lesson materials
CREATE POLICY "Admins can manage lesson materials"
    ON storage.objects FOR ALL
    USING (
        bucket_id = 'lesson-materials' AND
        public.has_role(auth.uid(), 'admin')
    );
```

---

## 5. API Controllers / Edge Functions

### 5.1 Authentication & Users

#### `POST /auth/signup`
- Create new user account
- Generate profile entry
- Initialize user_progress record
- Return session token

#### `POST /auth/login`
- Authenticate user
- Return session token

#### `POST /auth/logout`
- Invalidate session

#### `GET /users/profile`
- Get current user's profile
- Include progress, stats, achievements

#### `PUT /users/profile`
- Update profile information
- Avatar, display_name, bio, etc.

#### `GET /users/:id`
- Get public profile of any user
- Include stats, achievements

---

### 5.2 Courses

#### `GET /courses`
- List all published courses
- Filter by subject, grade_level, difficulty
- Pagination support

#### `GET /courses/:id`
- Get detailed course information
- Include units, lessons, requirements

#### `POST /courses/:id/enroll`
- Enroll user in course
- Initialize progress tracking

#### `GET /my-courses`
- Get user's enrolled courses
- Include progress percentages

#### `POST /courses` (Admin only)
- Create new course

#### `PUT /courses/:id` (Admin only)
- Update course details

#### `DELETE /courses/:id` (Admin only)
- Delete course

---

### 5.3 Lessons & Progress

#### `GET /lessons/:id`
- Get lesson content
- Video URL, materials, quiz

#### `POST /lessons/:id/progress`
- Update lesson progress
- Mark as completed
- Award XP

#### `POST /lessons/:id/video-progress`
- Track video watch progress
- Store seconds watched

#### `GET /units/:id/progress`
- Get user's progress in a unit

---

### 5.4 Quizzes & Assessments

#### `GET /quizzes/:id`
- Get quiz questions
- Don't include correct answers initially

#### `POST /quizzes/:id/attempt`
- Submit quiz attempt
- Calculate score
- Award XP and coins
- Return results with correct answers

#### `GET /quizzes/:id/attempts`
- Get user's previous attempts
- History and scores

#### `GET /daily-quiz`
- Get today's daily quiz

#### `GET /weekly-quiz`
- Get this week's quiz

---

### 5.5 Gamification

#### `GET /progress`
- Get user's XP, level, coins
- Streak information
- Progress towards next level

#### `POST /progress/xp`
- Add XP to user (internal use)
- Trigger achievement checks

#### `GET /leaderboard`
- Get top users by XP
- Filter by weekly, monthly, all-time
- Include friends leaderboard

#### `GET /achievements`
- List all achievements

#### `GET /achievements/user`
- Get user's unlocked achievements

#### `GET /daily-quests`
- Get today's quests
- Include user's progress

#### `POST /daily-quests/:id/progress`
- Update quest progress

---

### 5.6 Social Features

#### `GET /friends`
- Get user's friends list
- Include online status

#### `POST /friends/request`
- Send friend request

#### `POST /friends/:id/accept`
- Accept friend request

#### `DELETE /friends/:id`
- Remove friend

#### `GET /student-of-week`
- Get current student of the week

#### `GET /community/posts`
- List community posts
- Pagination, filtering

#### `POST /community/posts`
- Create new post

#### `PUT /community/posts/:id`
- Update own post

#### `DELETE /community/posts/:id`
- Delete own post

#### `POST /community/posts/:id/like`
- Like/unlike a post

#### `POST /community/posts/:id/comment`
- Add comment to post

---

### 5.7 Shop & Rewards

#### `GET /shop/items`
- List available shop items
- Filter by type

#### `POST /shop/items/:id/purchase`
- Purchase item with coins
- Add to inventory

#### `GET /inventory`
- Get user's purchased items

#### `POST /inventory/:id/equip`
- Equip item (avatar, badge, etc.)

---

### 5.8 Notifications

#### `GET /notifications`
- Get user's notifications
- Unread count

#### `PUT /notifications/:id/read`
- Mark notification as read

#### `PUT /notifications/read-all`
- Mark all as read

#### `GET /announcements`
- Get active announcements
- Filter by target_audience

---

### 5.9 Analytics (Admin)

#### `GET /admin/analytics/overview`
- Total users, courses, enrollments
- Active users stats

#### `GET /admin/analytics/courses`
- Course completion rates
- Popular courses

#### `GET /admin/analytics/engagement`
- Daily/weekly active users
- Average session time

#### `GET /admin/users`
- List all users
- Filter, search, pagination

#### `PUT /admin/users/:id/role`
- Assign/remove roles

---

## 6. Edge Functions (Specific Implementations)

### 6.1 `award-xp`
Awards XP to users and handles related side effects.
```typescript
// Inputs: user_id, amount, reason, reference_id
// Logic:
// 1. Create xp_transaction record
// 2. Update user_progress.total_xp
// 3. Check for level up (trigger achievement)
// 4. Check for achievement unlocks
// 5. Return new XP, level, achievements unlocked
```

### 6.2 `process-quiz-attempt`
Grades quiz and awards rewards.
```typescript
// Inputs: user_id, quiz_id, answers[]
// Logic:
// 1. Validate answers against quiz_answers
// 2. Calculate score
// 3. Create quiz_attempt record
// 4. Create quiz_responses records
// 5. Award XP/coins based on score
// 6. Update lesson_progress if applicable
// 7. Return score, correct answers, rewards
```

### 6.3 `update-leaderboard`
Scheduled function to refresh leaderboard.
```typescript
// Runs: Every hour
// Logic:
// 1. Calculate rankings based on total_xp
// 2. Calculate weekly rankings
// 3. Update leaderboard table
// 4. Notify users of rank changes
```

### 6.4 `generate-daily-quests`
Creates daily quests for all users.
```typescript
// Runs: Daily at midnight
// Logic:
// 1. Select quest templates
// 2. Create daily_quests records
// 3. Create user_daily_quests for all users
// 4. Send notifications
```

### 6.5 `check-achievements`
Checks if user unlocked achievements.
```typescript
// Inputs: user_id
// Logic:
// 1. Get user's stats (xp, courses completed, streak, etc.)
// 2. Check against achievement requirements
// 3. Create user_achievements records
// 4. Award XP/coin rewards
// 5. Create notifications
// 6. Return newly unlocked achievements
```

### 6.6 `ai-ask-question` (Future)
AI-powered learning assistant.
```typescript
// Inputs: user_id, lesson_id, question
// Logic:
// 1. Get lesson context
// 2. Call Lovable AI Gateway
// 3. Generate response
// 4. Log interaction
// 5. Return AI response
```

### 6.7 `send-notification`
Sends notifications to users.
```typescript
// Inputs: user_id, type, title, message, action_url
// Logic:
// 1. Create notification record
// 2. Send push notification (if enabled)
// 3. Send email (if enabled)
// 4. Return notification_id
```

---

## 7. Realtime Subscriptions

Enable realtime for key tables:

```sql
-- Enable realtime for leaderboard updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.leaderboard;

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Enable realtime for community posts
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;

-- Enable realtime for friend status
ALTER PUBLICATION supabase_realtime ADD TABLE public.friendships;
```

Frontend can subscribe:
```typescript
supabase
  .channel('leaderboard')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public',
    table: 'leaderboard' 
  }, handleLeaderboardChange)
  .subscribe()
```

---

## 8. Scheduled Jobs (pg_cron)

```sql
-- Update leaderboard hourly
SELECT cron.schedule(
  'update-leaderboard',
  '0 * * * *',
  'SELECT update_leaderboard_rankings()'
);

-- Reset daily quests at midnight
SELECT cron.schedule(
  'generate-daily-quests',
  '0 0 * * *',
  'SELECT generate_daily_quests()'
);

-- Check and break streaks for inactive users
SELECT cron.schedule(
  'check-streaks',
  '0 1 * * *',
  'SELECT check_user_streaks()'
);

-- Generate weekly student of the week
SELECT cron.schedule(
  'student-of-week',
  '0 0 * * 1',
  'SELECT select_student_of_week()'
);
```

---

## 9. API Response Formats

### Standard Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required",
    "field": "email"
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

## 10. Security Considerations

### Authentication
- ✅ Use Supabase Auth (email/password)
- ✅ Enable email confirmation (or auto-confirm for testing)
- ✅ Implement JWT refresh token flow
- ✅ Rate limit login attempts

### Authorization
- ✅ Role-based access control (RBAC)
- ✅ RLS policies on all tables
- ✅ Security definer functions to avoid RLS recursion
- ✅ Admin endpoints require admin role

### Data Validation
- ✅ Input validation on all endpoints
- ✅ Sanitize user-generated content
- ✅ Validate file uploads (size, type)
- ✅ Prevent SQL injection via parameterized queries

### Performance
- ✅ Database indexes on foreign keys
- ✅ Composite indexes for common queries
- ✅ Materialized views for leaderboards
- ✅ Caching for static content

---

## 11. Implementation Priority

### Phase 1: MVP (Core Features)
1. Authentication & profiles
2. User progress tracking (XP, levels, coins)
3. Basic course structure
4. Course enrollment
5. Lesson viewing
6. Mini quizzes
7. Basic leaderboard

### Phase 2: Gamification
1. Achievements system
2. Daily quests
3. Streak tracking
4. Shop & inventory
5. Weekly quizzes
6. Student of the week

### Phase 3: Social
1. Friend system
2. Community posts
3. Comments & likes
4. Notifications
5. Real-time updates

### Phase 4: Admin & Analytics
1. Admin dashboard
2. Course management
3. User management
4. Analytics & reporting
5. Content moderation

### Phase 5: Advanced Features
1. AI learning assistant
2. Personalized recommendations
3. Study groups
4. Live sessions
5. Certificates

---

## 12. Database Indexes

Key indexes for performance:

```sql
-- Profiles
CREATE INDEX idx_profiles_grade_level ON profiles(grade_level);

-- User Progress
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX idx_xp_transactions_created_at ON xp_transactions(created_at);

-- Courses
CREATE INDEX idx_courses_subject_id ON courses(subject_id);
CREATE INDEX idx_courses_grade_level ON courses(grade_level);
CREATE INDEX idx_courses_is_published ON courses(is_published);
CREATE INDEX idx_course_units_course_id ON course_units(course_id);
CREATE INDEX idx_course_lessons_unit_id ON course_lessons(unit_id);

-- Enrollments
CREATE INDEX idx_enrollments_user_course ON course_enrollments(user_id, course_id);
CREATE INDEX idx_lesson_progress_user_lesson ON lesson_progress(user_id, lesson_id);

-- Quizzes
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);

-- Social
CREATE INDEX idx_friendships_user_id ON friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON friendships(friend_id);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at);

-- Notifications
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- Leaderboard
CREATE INDEX idx_leaderboard_rank ON leaderboard(rank);
CREATE INDEX idx_leaderboard_weekly ON leaderboard(week_start, weekly_xp);
```

---

## Summary

This architecture provides a comprehensive backend structure for the Darsni learning platform, covering:

✅ **27 main database tables** with proper relationships
✅ **Row-Level Security policies** for data protection
✅ **Storage buckets** for avatars and course content
✅ **30+ API endpoints** for all frontend features
✅ **7 edge functions** for complex business logic
✅ **Realtime subscriptions** for live updates
✅ **Scheduled jobs** for automated tasks
✅ **Proper indexing** for performance
✅ **Security best practices** throughout

The backend is designed to be:
- **Scalable**: Can handle thousands of concurrent users
- **Secure**: RLS, RBAC, input validation
- **Performant**: Proper indexes, materialized views, caching
- **Maintainable**: Clear structure, documented relationships
- **Extensible**: Easy to add new features

Ready for implementation with Lovable Cloud + Supabase!

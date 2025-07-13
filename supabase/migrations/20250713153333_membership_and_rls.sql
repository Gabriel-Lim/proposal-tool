-- 1. Link users to tenants (1to1 for now)
create table membership (
  user_id   uuid primary key references auth.users on delete cascade,
  tenant_id uuid not null references tenant on delete cascade,
  created_at timestamptz default now()
);

-- 2. Enable & lock down RLS
alter table tenant  enable row level security;
alter table project enable row level security;
alter table membership enable row level security;

-- 3. Policies
-- Users can see their own membership row
create policy "Read own membership"
  on membership for select
  using (auth.uid() = user_id);

-- Tenant access = membership match
create policy "Tenant members can view"
  on tenant for select
  using (exists (
    select 1 from membership m
    where m.tenant_id = id and m.user_id = auth.uid()
  ));

-- Members can view / modify projects belonging to their tenant
create policy "Tenant members CRUD projects"
  on project
  for all
  using (exists (
    select 1 from membership m
    where m.tenant_id = project.tenant_id
      and m.user_id   = auth.uid()
  ))
  with check (exists (
    select 1 from membership m
    where m.tenant_id = project.tenant_id
      and m.user_id   = auth.uid()
  ));
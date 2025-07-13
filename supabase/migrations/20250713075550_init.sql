-- Tenants (partners) and projects
create table tenant (
  id uuid primary key default gen_random_uuid(),
  name text not null
);

create table project (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references tenant on delete cascade,
  name text not null,
  created_at timestamptz default now()
);
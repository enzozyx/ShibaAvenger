ALTER TABLE "t_db_account" DROP CONSTRAINT "fk_t_db_account";
ALTER TABLE "t_schema" DROP CONSTRAINT "schema_belong_to_database";
ALTER TABLE "t_relations" DROP CONSTRAINT "relation_of_schema";
ALTER TABLE "t_fields" DROP CONSTRAINT "field_belong_to_relation";
ALTER TABLE "t_constraints" DROP CONSTRAINT "constraint_of_field";

ALTER TABLE "t_database" DROP CONSTRAINT "database_checker";
ALTER TABLE "t_db_account" DROP CONSTRAINT "unique_of_username_in_same_db";
ALTER TABLE "t_schema" DROP CONSTRAINT "unique_schema_name_in_same_database";
ALTER TABLE "t_relations" DROP CONSTRAINT "uniqe_name_in_same_schema";
ALTER TABLE "t_fields" DROP CONSTRAINT "unique_field_name_in_same_relation";
ALTER TABLE "t_fields" DROP CONSTRAINT "field_type_checker";

DROP TABLE "t_database";
DROP TABLE "t_db_account";
DROP TABLE "t_schema";
DROP TABLE "t_relations";
DROP TABLE "t_fields";
DROP TABLE "t_constraints";

CREATE TABLE "t_database" (
"id" int4 NOT NULL,
"name" varchar(128) NOT NULL,
"alias" varchar(128) NOT NULL,
"server_ip" varchar(15),
"server_port" int4,
"category" int2 NOT NULL DEFAULT 2,
"location" varchar(255),
"lasted" timestamp(255) NOT NULL DEFAULT now(),
PRIMARY KEY ("id") ,
CONSTRAINT "database_checker" CHECK (category in  (1,2,3,4))
)
WITHOUT OIDS;

COMMENT ON TABLE "t_database" IS '数据信息表，用于存储数据库元信息';
COMMENT ON COLUMN "t_database"."id" IS '数据库ID';
COMMENT ON COLUMN "t_database"."name" IS ' 数据库实例名';
COMMENT ON COLUMN "t_database"."alias" IS '展示别名';
COMMENT ON COLUMN "t_database"."server_ip" IS ' 数据库服务IP';
COMMENT ON COLUMN "t_database"."server_port" IS '服务端口';
COMMENT ON COLUMN "t_database"."category" IS '数据库类型(1-mysql;2-postgresql;3-oracle;4-sqlserver)';
COMMENT ON COLUMN "t_database"."location" IS '屋物理存储文件存放位置';
COMMENT ON COLUMN "t_database"."lasted" IS '最新更新时间';

CREATE TABLE "t_db_account" (
"id" int4 NOT NULL,
"username" varchar(255) NOT NULL,
"password" varchar(128) NOT NULL,
"db_id" int4 NOT NULL,
PRIMARY KEY ("id") ,
CONSTRAINT "unique_of_username_in_same_db" UNIQUE ("username", "db_id")
)
WITHOUT OIDS;

COMMENT ON CONSTRAINT "unique_of_username_in_same_db" ON "t_db_account" IS '一个数据库内不允许存在多个同名账户';
COMMENT ON COLUMN "t_db_account"."id" IS '数据库账户ID';
COMMENT ON COLUMN "t_db_account"."username" IS '账户名';
COMMENT ON COLUMN "t_db_account"."password" IS '账户密码';

CREATE TABLE "t_schema" (
"id" int4 NOT NULL,
"name" varchar(128) NOT NULL,
"alias" varchar(128) NOT NULL,
"db_id" int4 NOT NULL,
"lasted" timestamp(255) NOT NULL DEFAULT now(),
PRIMARY KEY ("id") ,
CONSTRAINT "unique_schema_name_in_same_database" UNIQUE ("name", "db_id")
)
WITHOUT OIDS;

COMMENT ON CONSTRAINT "unique_schema_name_in_same_database" ON "t_schema" IS '同一数据库内模式名不允许重复';
COMMENT ON TABLE "t_schema" IS ' 数据库模式';
COMMENT ON COLUMN "t_schema"."id" IS '模式识别ID';
COMMENT ON COLUMN "t_schema"."name" IS '模式名称';
COMMENT ON COLUMN "t_schema"."alias" IS '模式别名(展示名)';
COMMENT ON COLUMN "t_schema"."db_id" IS '所属数据库ID';
COMMENT ON COLUMN "t_schema"."lasted" IS '最新更新时间';

CREATE TABLE "t_relations" (
"id" int4 NOT NULL,
"name" varchar(255) NOT NULL,
"alias" varchar(255) NOT NULL,
"schema_id" int4 NOT NULL,
"lasted" timestamp(255) NOT NULL DEFAULT now(),
"comment" varchar(255),
PRIMARY KEY ("id") ,
CONSTRAINT "uniqe_name_in_same_schema" UNIQUE ("name", "schema_id")
)
WITHOUT OIDS;

COMMENT ON CONSTRAINT "uniqe_name_in_same_schema" ON "t_relations" IS '同一模式下表名不允许重复';
COMMENT ON TABLE "t_relations" IS '关系数据表信息';
COMMENT ON COLUMN "t_relations"."name" IS '关系表名';
COMMENT ON COLUMN "t_relations"."alias" IS '关系表别名';
COMMENT ON COLUMN "t_relations"."schema_id" IS '所属模型ID';
COMMENT ON COLUMN "t_relations"."lasted" IS '最新更新时间';
COMMENT ON COLUMN "t_relations"."comment" IS '备注';

CREATE TABLE "t_fields" (
"id" int4 NOT NULL,
"name" varchar(255) NOT NULL,
"alias" varchar(255) NOT NULL,
"relation_id" int4 NOT NULL,
"lasted" timestamp(255) NOT NULL DEFAULT now(),
"field_type" int2 NOT NULL,
"comment" varchar(255),
PRIMARY KEY ("id") ,
CONSTRAINT "unique_field_name_in_same_relation" UNIQUE ("relation_id", "name"),
CONSTRAINT "field_type_checker" CHECK (field_type in (1,2,3,4,5,6,7,8))
)
WITHOUT OIDS;

COMMENT ON CONSTRAINT "unique_field_name_in_same_relation" ON "t_fields" IS ' 关系表内不允许同名字段';
COMMENT ON TABLE "t_fields" IS '字段信息表';
COMMENT ON COLUMN "t_fields"."name" IS '字段名';
COMMENT ON COLUMN "t_fields"."alias" IS '字段别名(展示用)';
COMMENT ON COLUMN "t_fields"."relation_id" IS '所属关系ID';
COMMENT ON COLUMN "t_fields"."lasted" IS '最新更新时间';
COMMENT ON COLUMN "t_fields"."field_type" IS '字段类型(1-整型,2-字符串,3-short,4-date,5-time,6-timestamp,7-浮点,8-其它 )';
COMMENT ON COLUMN "t_fields"."comment" IS '字段备注';

CREATE TABLE "t_constraints" (
"id" int4 NOT NULL,
"name" varchar(255) NOT NULL,
"description" varchar(255) NOT NULL,
"category" int2 NOT NULL,
"value" varchar(255) NOT NULL,
"field_id" int4 NOT NULL,
PRIMARY KEY ("id") 
)
WITHOUT OIDS;

COMMENT ON COLUMN "t_constraints"."name" IS '约束名称';
COMMENT ON COLUMN "t_constraints"."description" IS '约束描述';
COMMENT ON COLUMN "t_constraints"."category" IS '约束类型';
COMMENT ON COLUMN "t_constraints"."value" IS '约束参考值';
COMMENT ON COLUMN "t_constraints"."field_id" IS '字段ID';


ALTER TABLE "t_db_account" ADD CONSTRAINT "fk_t_db_account" FOREIGN KEY ("db_id") REFERENCES "t_database" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
COMMENT ON CONSTRAINT "fk_t_db_account" ON "t_db_account" IS '数据库与数据库账户映射关系约束';
ALTER TABLE "t_schema" ADD CONSTRAINT "schema_belong_to_database" FOREIGN KEY ("db_id") REFERENCES "t_database" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
COMMENT ON CONSTRAINT "schema_belong_to_database" ON "t_schema" IS '模式归属数据库';
ALTER TABLE "t_relations" ADD CONSTRAINT "relation_of_schema" FOREIGN KEY ("schema_id") REFERENCES "t_schema" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
COMMENT ON CONSTRAINT "relation_of_schema" ON "t_relations" IS '关系表从属于模式';
ALTER TABLE "t_fields" ADD CONSTRAINT "field_belong_to_relation" FOREIGN KEY ("relation_id") REFERENCES "t_relations" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "t_constraints" ADD CONSTRAINT "constraint_of_field" FOREIGN KEY ("field_id") REFERENCES "t_fields" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
COMMENT ON CONSTRAINT "constraint_of_field" ON "t_constraints" IS '字段约束';


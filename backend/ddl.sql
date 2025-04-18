-- 見積伝票 (TB1073)
CREATE TABLE if not exists quotation (
    id SERIAL PRIMARY KEY,
    quotation_id CHAR(10) NOT NULL,
    quotation_branch_no CHAR(3) NOT NULL,
    quotation_sfid CHAR(18) NOT NULL,
    quotation_name VARCHAR(80),
    quotation_text VARCHAR(40) NOT NULL,
    expected_order_sfid CHAR(18) NOT NULL,
    sales_office CHAR(40),
    sales_office_name VARCHAR(40),
    sales_group CHAR(40),
    sales_group_name VARCHAR(40),
    sales_user_id CHAR(40),
    business_user_id CHAR(40),
    sales_organization CHAR(40),
    sales_organization_name VARCHAR(100),
    quotation_pattern CHAR(1) NOT NULL,
    opportunity_flg CHAR(1),
    currency_category CHAR(1),
    quotation_amount_jpy INTEGER,
    quotation_amount_usd NUMERIC(18, 2),
    machine_service_sales_date_plan TIMESTAMP,
    terms_contract_start_date TIMESTAMP,
    terms_contract_end_date TIMESTAMP,
    status_cpq_id VARCHAR(2),
    order_recipient_id CHAR(10),
    quotation_start_date TIMESTAMP,
    quotation_expiration_date TIMESTAMP,
    supplier_quotation_expiration_date TIMESTAMP,
    maintenance_contract_id CHAR(10),
    individual_contract_no CHAR(25),
    non_regulated_supplier CHAR(1),
    compliance_flg CHAR(1),
    profit_rate NUMERIC(3, 1),
    machine_forecast_amount INTEGER,
    contract_forecast_amount INTEGER,
    quotation_type_010 CHAR(1),
    quotation_type_020 CHAR(1),
    quotation_type_030 CHAR(1),
    quotation_type_040 CHAR(1),
    quotation_type_050 CHAR(1),
    quotation_type_060 CHAR(1),
    quotation_type_070 CHAR(1),
    quotation_type_080 CHAR(1),
    quotation_type_090 CHAR(1),
    quotation_type_100 CHAR(1),
    quotation_type_110 CHAR(1),
    quotation_type_120 CHAR(1),
    seal_type_id CHAR(3),
    in_charge_name VARCHAR(100),
    maintenance_box_id CHAR(12),
    vbeln VARCHAR(40),
    contstart_date TIMESTAMP,
    contend_date TIMESTAMP,
    quotation_id_from CHAR(10),
    quotation_branch_no_from CHAR(3),
    quotation_date TIMESTAMP,
    delivery_address_memo VARCHAR(255),
    billing_address_memo VARCHAR(255),
    sava_memo VARCHAR(255),
    special_remarks VARCHAR(255),
    profit_rate_ex_lease NUMERIC(3, 1),
    machine_forecast_amount_ex_lease INTEGER,
    contract_forecast_amount_ex_lease INTEGER,
    invalid_flag CHAR(1),
    profit_rate_machine NUMERIC(3, 1),
    profit_rate_period_ex_lease NUMERIC(3, 1),
    bcntrctno CHAR(20),
    bill_cond VARCHAR(72),
    cntform CHAR(1)
);

-- 見積伝票明細 (TB1074)
CREATE TABLE if not exists quotation_detail (
    id SERIAL PRIMARY KEY,
    quotation_table_id INTEGER NOT NULL,
    quotation_id CHAR(10) NOT NULL,
    quotation_branch_no CHAR(3) NOT NULL,
    quotation_detail_id INTEGER NOT NULL,
    quotation_type CHAR(1) NOT NULL,
    detail_type CHAR(1) NOT NULL DEFAULT '1',
    change_time TIMESTAMP,
    registration_time TIMESTAMP,
    product_id CHAR(40),
    product_name CHAR(40),
    unit_price INTEGER,
    cost_price INTEGER,
    rate_of_cost_price INTEGER,
    rate_of_cost INTEGER,
    quotation_price INTEGER,
    total_cost_amount INTEGER,
    process_type CHAR(40),
    quantity INTEGER,
    reason_for_rejection CHAR(40),
    currency_classification_of_amount_provided CHAR(2),
    currency_classification_of_cost CHAR(2),
    counter1_for_confirmation CHAR(40),
    counter2_for_confirmation CHAR(40),
    compliance_check_remarks_column VARCHAR(100),
    intangible_flag CHAR(1),
    method_of_provision CHAR(40),
    contract_start_date TIMESTAMP,
    contract_end_date TIMESTAMP,
    purchase_request_approval_chk_flg CHAR(1),
    purchase_request_comments VARCHAR(100),
    shipping_method CHAR(40),
    fund_recognition_number VARCHAR(40),
    perform_id CHAR(10),
    cisco_vendor_support CHAR,
    arrangement_date TIMESTAMP,
    remarks VARCHAR(50),
    maker_model CHAR(40),
    quotation_date TIMESTAMP,
    zlifnr VARCHAR(10) NOT NULL,
    werks CHAR(4),
    supplier_quotation_expiration_date TIMESTAMP,
    statement_category CHAR(10),
    zdeal_id CHAR(15) NOT NULL,
    zdiscount NUMERIC(15, 4),
    sales_date_plan TIMESTAMP,
    std_price INTEGER,
    print_std_price INTEGER,
    disc_rate NUMERIC(3, 1),
    zmaker_product_code CHAR(40),
    service_std_id CHAR(10),
    zprf NUMERIC(3, 1)
);
CREATE TABLE if not exists programming_languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE if not exists frameworks (
    id SERIAL PRIMARY KEY,
    language_id INTEGER REFERENCES programming_languages(id),
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE if not exists database_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE if not exists frontend_languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE if not exists frontend_libraries (
    id SERIAL PRIMARY KEY,
    language_id INTEGER REFERENCES frontend_languages(id),
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200)
);

-- 编程语言
INSERT INTO programming_languages (name, description) VALUES
('Python', 'プログラミング初心者でも扱いやすいオープンソースのプログラミング言語です'),
('Java', '世界中で利用されているプログラミング言語です。オブジェクト指向の言語で、マルチプラットフォームで動作するアプリケーションやソフトウェアを開発できます')
on conflict do nothing;

-- Python框架
INSERT INTO frameworks (language_id, name, description) VALUES
((SELECT id FROM programming_languages WHERE name = 'Python'), 'FastAPI', 'PythonでWeb APIを構築するためのフレームワークです'),
((SELECT id FROM programming_languages WHERE name = 'Python'), 'Django', 'Pythonで書かれたWebアプリケーションフレームワークです'),
((SELECT id FROM programming_languages WHERE name = 'Java'), 'Springboot', 'Java ベースのオープンソースのフレームワークで、Web アプリケーションやマイクロサービスの開発を効率的に行うためのツールです')
on conflict do nothing;

-- 数据库类型
INSERT INTO database_types (name, description) VALUES
('PostgreSQL', 'オープンソースのデータベース管理システム（RDBMS）です'),
('MySQL', 'Oracle社が提供するオープンソースのデータベース管理システム（RDBMS）です')
on conflict do nothing;

-- 前端语言
INSERT INTO frontend_languages (name, description) VALUES
('React', 'WebサイトやWebアプリのユーザーインターフェース（UI）を構築するためのJavaScriptライブラリです'),
('Vue', 'ウェブアプリケーションにおけるユーザインタフェースを構築するための、オープンソースのJavaScriptフレームワークである'),
('Html', 'Webページを作成するための言語で、Webサイトの基礎をなす技術です。')
on conflict do nothing;

-- React 组件库
INSERT INTO frontend_libraries (language_id, name, description) VALUES
((SELECT id FROM frontend_languages WHERE name = 'React'), 'Material UI', 'Material-UIとは、Googleのマテリアルデザインの仕様を取り入れているReact用のUIコンポーネントライブラリです。'),
((SELECT id FROM frontend_languages WHERE name = 'React'), 'Ant Design', 'アリババ、アリペイ、Huabei、MYbank などの親会社である Ant グループによって開発されたオープンソースのデザインシステムであり'),
((SELECT id FROM frontend_languages WHERE name = 'Vue'), 'primevue', 'Vue.js で利用できる包括的な UI コンポーネントライブラリのことです'),
((SELECT id FROM frontend_languages WHERE name = 'Html'), 'jQuery', 'JavaScriptのライブラリで、Webサイト制作に利用されるツールです')
on conflict do nothing;

import { TreeViewBaseItem } from '@mui/x-tree-view/models';

type TreeItemType = {
  id: string;
  label: string;
  disabled?: boolean;
  editable?: boolean;
};

export const SYS_MENU: TreeViewBaseItem<TreeItemType>[] = [
  {
    id: 'design_base',
    label: '基本設計',
    children: [
      {
        id: 'summary_create',
        label: '機能概要作成',
      },
      { id: 'use_case_create', label: 'ユーザケース作成' },
      { id: 'design_db', label: 'DB設計',
        children: [
          { id: 'doc_check', label: '仕様書チェック' },
        ],
       },
       { id: 'design_page', label: '画面作成',
         children: [
           { id: 'adjust_layout', label: '画面レイアウト調整' },
           { id: 'common_check', label: '統一性のチェック' },
         ],
        },
    ],
  },
  {
    id: 'design_detail',
    label: '詳細設計',
    children: [
      { id: 'field_list_create', label: '項目一覧作成' },
      { id: 'event_list_create', label: 'イベント仕様作成' }
    ],
  },
  {
    id: 'design_code',
    label: 'プログラミング',
    children: [
      { id: 'page_create', label: '画面生成' },
      { id: 'api_create', label: 'API生成' },
    ],
  },
  {
    id: 'design_test',
    label: 'テスト',
    children: [
      { id: 'test_data_create', label: 'テストデータ作成' },
    ],
  },
  {
    id: 'setting',
    label: 'システム設定',
    children: [
      { id: 'summary', label: '概要' },
      { id: 'dict', label: '用語集' },
      { id: 'doc_def', label: 'ドキュメント定義' },
      { id: 'design_rule', label: '設計ルール' },
      { id: 'code_rule', label: 'コーディング規約' },
    ],
  },
];

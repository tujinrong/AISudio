import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import {SYS_MENU} from './Menu'
import CodeGenerator from './CodeGenerator';

export default function SiteMenu() {
  return (
    <Box sx={{ minHeight: 352 }}>
      <RichTreeView
        items={SYS_MENU}
        experimentalFeatures={{ indentationAtItemLevel: true }}
        defaultExpandedItems={['grid']}
      />
      <CodeGenerator />
    </Box>
  );
}

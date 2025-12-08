/**
 * 团队成员个人空间索引
 *
 * 这个文件汇总了所有团队成员的个人空间数据
 * 每个成员的空间数据都在独立的文件中，方便各自维护
 *
 * 使用方式：
 * import { allSpaces } from '@site/src/spaces';
 * <MySpace members={allSpaces} />
 */

import { benhzSpace } from './benhz-space';
import { aClassmateSpace } from './a-classmate-space';
import { bClassmateSpace } from './b-classmate-space';
import { cClassmateSpace } from './c-classmate-space';
import { dClassmateSpace } from './d-classmate-space';
import { eClassmateSpace } from './e-classmate-space';

export const allSpaces = [
  benhzSpace,
  aClassmateSpace,
  bClassmateSpace,
  cClassmateSpace,
  dClassmateSpace,
  eClassmateSpace,
];

// 导出单个空间，方便按需使用
export {
  benhzSpace,
  aClassmateSpace,
  bClassmateSpace,
  cClassmateSpace,
  dClassmateSpace,
  eClassmateSpace,
};

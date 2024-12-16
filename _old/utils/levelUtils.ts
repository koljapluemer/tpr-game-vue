import { levelTemplates, type LevelTemplateName } from '@/data/levelTemplates'
import type { LevelTemplate } from '@/types'

export function getLevelTemplateByID(id: LevelTemplateName): LevelTemplate | undefined {
  return levelTemplates.find((level) => level.id === id)
}

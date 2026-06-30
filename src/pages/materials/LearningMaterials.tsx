import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useLanguage } from '../../contexts/LanguageContext';
import SEOHead from '../../components/SEOHead';
import { MATERIAL_CATEGORIES, MATERIALS } from '../../data/materials';
import type { ReactElement } from 'react';

export default function LearningMaterials(): ReactElement {
  const { category: routeCategory } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const isKo = language === 'ko';

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = routeCategory || MATERIAL_CATEGORIES[0]?.id || 'foundation';
    return new Set([initial]);
  });
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Auto-expand category from route param
  useEffect(() => {
    if (routeCategory) {
      setExpandedCategories(prev => new Set(prev).add(routeCategory));
    }
  }, [routeCategory]);

  // 특정 자료 딥링크(?m=<id>)로 바로 열기
  useEffect(() => {
    const m = searchParams.get('m');
    if (!m) return;
    const item = MATERIALS.find(x => x.id === m);
    if (!item) return;
    setSelectedItemId(m);
    setExpandedCategories(prev => new Set(prev).add(item.categoryId));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams]);

  const selectedItem = selectedItemId ? MATERIALS.find(m => m.id === selectedItemId) : null;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const handleItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find which category the selected item belongs to
  const selectedCategory = selectedItem
    ? MATERIAL_CATEGORIES.find(c => c.id === selectedItem.categoryId)
    : null;

  return (
    <>
      <SEOHead
        title={isKo ? '학습자료' : 'Learning Materials'}
        path="/materials"
      />

      <section className="page-header">
        <div className="container">
          <h1>{isKo ? '학습자료' : 'Learning Materials'}</h1>
          <p>{isKo
            ? '교육에 필요한 자료를 카테고리별로 제공합니다.'
            : 'Educational materials organized by category.'}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="materials-layout">
            {/* Sidebar with accordion */}
            <aside className="materials-sidebar">
              <nav>
                {MATERIAL_CATEGORIES.map(cat => {
                  const isExpanded = expandedCategories.has(cat.id);
                  const items = MATERIALS.filter(m => m.categoryId === cat.id);
                  return (
                    <div key={cat.id} className="sidebar-group">
                      <button
                        className={`sidebar-item sidebar-category ${isExpanded ? 'expanded' : ''}`}
                        onClick={() => toggleCategory(cat.id)}
                      >
                        <i className={`fa-solid ${cat.icon}`} />
                        <span className="sidebar-category-label">{isKo ? cat.nameKo : cat.nameEn}</span>
                        <i className={`fa-solid fa-chevron-down sidebar-chevron ${isExpanded ? 'open' : ''}`} />
                      </button>
                      {isExpanded && (
                        <div className="sidebar-subitems">
                          {items.map(item => (
                            <button
                              key={item.id}
                              className={`sidebar-subitem ${selectedItemId === item.id ? 'active' : ''}`}
                              onClick={() => handleItemClick(item.id)}
                            >
                              <i className={`fa-solid ${item.type === 'guide' ? 'fa-book' : item.type === 'template' ? 'fa-file-alt' : 'fa-bookmark'}`} />
                              {isKo ? item.nameKo : item.nameEn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Content */}
            <div className="materials-content">
              {selectedItem ? (
                <>
                  <div className="materials-breadcrumb">
                    <button className="breadcrumb-link" onClick={handleBackToList}>
                      {isKo ? '학습자료' : 'Materials'}
                    </button>
                    <i className="fa-solid fa-chevron-right" />
                    {selectedCategory && (
                      <>
                        <span>{isKo ? selectedCategory.nameKo : selectedCategory.nameEn}</span>
                        <i className="fa-solid fa-chevron-right" />
                      </>
                    )}
                    <span className="breadcrumb-current">{isKo ? selectedItem.nameKo : selectedItem.nameEn}</span>
                  </div>
                  <h2>{isKo ? selectedItem.nameKo : selectedItem.nameEn}</h2>
                  <span className="material-type">{selectedItem.type}</span>
                  <div className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {isKo ? selectedItem.contentKo : selectedItem.contentEn}
                    </ReactMarkdown>
                  </div>
                </>
              ) : (
                <div className="materials-welcome">
                  <div className="materials-welcome-icon">
                    <i className="fa-solid fa-book-open" />
                  </div>
                  <h2>{isKo ? '학습자료에 오신 것을 환영합니다' : 'Welcome to Learning Materials'}</h2>
                  <p>{isKo
                    ? '왼쪽 메뉴에서 카테고리를 펼치고 원하는 자료를 선택하세요.'
                    : 'Expand a category on the left and select a material to read.'}</p>

                  <div className="materials-overview">
                    {MATERIAL_CATEGORIES.map(cat => {
                      const items = MATERIALS.filter(m => m.categoryId === cat.id);
                      return (
                        <div key={cat.id} className="materials-overview-card" onClick={() => {
                          setExpandedCategories(prev => new Set(prev).add(cat.id));
                          if (items.length > 0) handleItemClick(items[0].id);
                        }}>
                          <div className="overview-card-icon">
                            <i className={`fa-solid ${cat.icon}`} />
                          </div>
                          <h4>{isKo ? cat.nameKo : cat.nameEn}</h4>
                          <p>{isKo ? cat.descKo : cat.descEn}</p>
                          <span className="overview-card-count">{items.length} {isKo ? '개 자료' : 'materials'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Callout } from '@/components/Callout'
import { LinkGrid } from '@/components/LinkGrid'
import { Article } from '@/components/Article'
import { MathFormula, InlineMath } from '@/components/Math'
import { Tag } from '@markdoc/markdoc';
import { Tab } from '@/components/Tab'
import { Tabs } from '@/components/Tabs'

const tabs = {
  render: Tabs,
  attributes: {},
  transform(node, config) {
    const labels = node
      .transformChildren(config)
      .filter((child) => child && child.name === 'Tab')
      .map((tab) => (typeof tab === 'object' ? tab.attributes.label : null));

    return new Tag(this.render, { labels }, node.transformChildren(config));
  }
};

const tab = {
  render: Tab,
  attributes: {
    label: {
      type: String
    }
  }
};

const tags = {
  mathFormula: {
    attributes: {
      formula: { type: String },
    },
    render: MathFormula,
  },
  inlineMath: {
    render: InlineMath,
  },
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  article: {
    render: Article,
    attributes: {
      i18n: {
        type: String
      }
    }
  },
  'link-grid': {
    render: LinkGrid,
  },
  'link-grid-link': {
    selfClosing: true,
    render: LinkGrid.Link,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  tabs,
  tab,
}

export default tags

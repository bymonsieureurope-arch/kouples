"use client";
import { useEffect, useState, useRef } from "react";
import {
  Home,
  Heart,
  Sparkles,
  Users,
  Tag,
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  Check,
  Send,
  MessageCircle,
  Wallet,
  CalendarDays,
  ChevronRight,
  Bell,
  Leaf,
  CheckCheck,
  PencilLine,
  Clock3,
  MapPin,
  Star,
  Bookmark,
} from "lucide-react";
import { initial, pictures, couples, offers, type Data } from "../lib/demo";
const tabs = [
  { name: "Accueil", icon: Home },
  { name: "Couple", icon: Heart },
  { name: "IA", icon: Sparkles },
  { name: "Tribu", icon: Users },
  { name: "Offres", icon: Tag },
];
function Photo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const fallback = (image: HTMLImageElement) => {
    if (!image.src.endsWith("/illustration.svg")) {
      image.src = "/illustration.svg";
      image.alt = "Illustration Kouples — photo indisponible sur ce réseau";
    }
  };
  useEffect(() => {
    const image = ref.current;
    if (image?.complete && image.naturalWidth === 0) fallback(image);
  }, [props.src]);
  return (
    <img
      {...props}
      ref={ref}
      onError={(event) => fallback(event.currentTarget)}
    />
  );
}
export default function App() {
  const [data, setData] = useState<Data>(initial),
    [loaded, setLoaded] = useState(false),
    [tab, setTab] = useState("Accueil"),
    [modal, setModal] = useState(""),
    [toast, setToast] = useState(""),
    [category, setCategory] = useState("Tout"),
    [city, setCity] = useState("Toutes les villes"),
    [month, setMonth] = useState("Toutes les périodes"),
    [input, setInput] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kouples-demo-v1");
      if (saved) setData({ ...initial, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem("kouples-demo-v1", JSON.stringify(data));
      } catch {
        setToast(
          "Le stockage est indisponible : vos modifications restent dans cette session.",
        );
      }
    }
  }, [data, loaded]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  useEffect(() => {
    if (!modal) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = document.querySelector<HTMLElement>("[role=dialog]");
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button, input, textarea, select, [tabindex="0"]',
        ) || [],
      ).filter((el) => !el.hasAttribute("disabled"));
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal("");
      if (event.key === "Tab") {
        const elements = focusable(),
          first = elements[0],
          last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [modal]);
  const update = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));
  const go = (name: string) => {
    setTab(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggle = (
    key: "favorites" | "joined" | "done" | "groups",
    id: string,
  ) =>
    setData((d) => ({
      ...d,
      [key]: d[key].includes(id)
        ? d[key].filter((x) => x !== id)
        : [...d[key], id],
    }));
  const days = data.auto
    ? Math.max(
        0,
        Math.ceil(
          (new Date(data.date + "T00:00:00").getTime() - Date.now()) / 86400000,
        ),
      )
    : 184;
  const tasks = [
    "Choisir vos alliances",
    "Confirmer le traiteur",
    "Envoyer les faire-part",
    "Préparer votre playlist",
  ];
  const send = (text: string) => {
    if (!text.trim()) return;
    let reply =
      "Pour avancer sereinement, choisissez ensemble une petite action cette semaine : " +
      (tasks.find((t) => !data.done.includes(t)) ||
        "prévoir un moment rien qu’à vous") +
      ". Réservez-lui 30 minutes dans votre agenda, puis faites le point à deux.";
    if (/fleur|budget/i.test(text))
      reply =
        "Pour alléger le budget fleurs, privilégiez les variétés de saison, réutilisez les compositions de la cérémonie au dîner et concentrez la décoration sur quelques espaces. Demandez trois devis comparables. L’achat groupé de démonstration Atelier Pivoine peut aussi vous inspirer.";
    if (/activité|deux|sortie/i.test(text))
      reply =
        "Et si vous organisiez une promenade sans téléphone, suivie d’un dîner où chacun partage son plus beau souvenir de vous deux ? Fixez un petit budget et choisissez le lieu à tour de rôle.";
    update({
      chat: [
        ...data.chat,
        { role: "user", text },
        { role: "assistant", text: reply },
      ],
    });
    setInput("");
  };
  const Section = ({
    eyebrow,
    title,
    children,
    action,
  }: {
    eyebrow?: string;
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
  }) => (
    <section className="section">
      <div className="section-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>
            {title === "Vos mots du jour" ? (
              <Heart className="section-icon" />
            ) : title === "Votre prochaine action" ? (
              <CalendarDays className="section-icon" />
            ) : title === "La tribu des mariés" ? (
              <Users className="section-icon" fill="currentColor" />
            ) : null}
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
  const OfferCard = ({ offer: o }: { offer: (typeof offers)[number] }) => (
    <article className="offer-card">
      <div className="offer-main">
        <div className="offer-image">
          <Photo src={o.image} alt={o.category} loading="lazy" />
        </div>
        <div className="offer-body">
          <h3>{o.name}</h3>
          <p className="specialty">
            {"specialty" in o ? String(o.specialty) : o.category}
          </p>
          <div className="provider-meta">
            <span>
              <Star size={13} fill="currentColor" /> 4,9{" "}
              <span className="review-count">(avis démo)</span>
            </span>
            <span>
              <MapPin size={13} />
              {o.city}
            </span>
          </div>
          <blockquote>
            « {o.desc} »
            <cite>— {"signature" in o ? String(o.signature) : "L’équipe"}</cite>
          </blockquote>
          <span className="provider-demo">
            Prestataire, avis et offre fictifs · Démonstration
          </span>
        </div>
        <button
          className={
            "favorite " + (data.favorites.includes(o.id) ? "active" : "")
          }
          aria-label={"Sauvegarder " + o.name}
          onClick={() => toggle("favorites", o.id)}
        >
          <Heart
            size={20}
            fill={data.favorites.includes(o.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <button
        className={
          "collective-band " + (data.joined.includes(o.id) ? "joined" : "")
        }
        aria-label={
          (data.joined.includes(o.id)
            ? "Quitter l’offre "
            : "Rejoindre l’offre ") + o.name
        }
        onClick={() => {
          toggle("joined", o.id);
          setToast(
            data.joined.includes(o.id)
              ? "Participation annulée"
              : "Participation enregistrée en démonstration",
          );
        }}
      >
        <Users className="collective-icon" size={32} fill="currentColor" />
        <span>
          <strong>
            {o.collective.split(" avec")[0].split(" à partir")[0]}
          </strong>
          <small>
            {data.joined.includes(o.id)
              ? "Vous participez · toucher pour quitter"
              : o.id === "fleurs"
                ? "si cinq couples de la tribu se réunissent"
                : "si vous prenez rendez-vous avec un autre couple de la tribu"}
          </small>
        </span>
        <span className="offer-join">
          {data.joined.includes(o.id) ? (
            <Check size={22} />
          ) : (
            <ArrowRight size={22} />
          )}
        </span>
      </button>
    </article>
  );
  const Messages = () => (
    <>
      <div className="messages-grid">
        {data.messages.map((m, i) => (
          <button
            key={i}
            className={"note note-" + i}
            onClick={() => setModal("message" + i)}
          >
            <div className="note-author">
              <Photo
                className="avatar member-photo"
                src={i ? pictures.julien : pictures.sarah}
                alt=""
              />
              <div>
                <b>{data.members[i]}</b>
                <small>{i ? "Ta réponse" : "Sa réponse"}</small>
              </div>
              <span className={"note-heart " + (i === 0 ? "loved" : "")}>
                <Heart size={17} fill={i === 0 ? "currentColor" : "none"} />
              </span>
            </div>
            <p>« {m} »</p>
            <span className="note-footer">
              Rien que pour toi <span>Modifier ↗</span>
            </span>
          </button>
        ))}
      </div>
      <button
        className="text-button centered"
        onClick={() => setModal("message0")}
      >
        <PencilLine size={17} /> Écrire un nouveau message
      </button>
    </>
  );
  const Profiles = () => (
    <div className="profiles">
      {couples
        .filter(
          (c) =>
            (city === "Toutes les villes" || c.city === city) &&
            (month === "Toutes les périodes" || c.month === month),
        )
        .map((c) => (
          <button
            className="profile"
            key={c.name}
            onClick={() => {
              setModal("discussion:" + c.name);
            }}
          >
            <Photo src={c.img} alt={c.name} />
            <h3>{c.name}</h3>
            <p>
              <span>{c.month}</span>
              <span>{c.city}</span>
            </p>
          </button>
        ))}
      <button className="join-profile" onClick={() => go("Tribu")}>
        <span>
          <Plus size={24} />
        </span>
        <small>
          Rejoindre
          <br />
          d’autres couples
        </small>
      </button>
    </div>
  );
  const Feed = () => (
    <div className="feed">
      {data.posts.map((p) => (
        <article
          className={"post " + (p.id === 1 ? "featured-post" : "")}
          key={p.id}
        >
          <div className="post-author">
            <Photo
              className="avatar"
              src={p.id === 1 ? couples[0].img : pictures.sarah}
              alt=""
            />
            <div>
              <b>{p.author}</b>
              <small>
                {p.id === 1
                  ? "Juin 2027 · Paris"
                  : "Dans la tribu · Démonstration"}
              </small>
            </div>
            <Leaf size={19} />
          </div>
          <p>{p.text}</p>
          {p.id === 1 && (
            <button
              className="post-gallery"
              aria-label="Voir les inspirations de la discussion"
              onClick={() => setModal("comment:" + p.id)}
            >
              <Photo src={pictures.dinner} alt="Inspiration dîner de mariage" />
              <Photo src={pictures.venue} alt="Inspiration lieu de réception" />
              <span>+3</span>
            </button>
          )}
          <div className="post-actions">
            <button
              onClick={() =>
                update({
                  posts: data.posts.map((x) =>
                    x.id === p.id
                      ? {
                          ...x,
                          liked: !x.liked,
                          likes: x.likes + (x.liked ? -1 : 1),
                        }
                      : x,
                  ),
                })
              }
            >
              <Heart size={17} fill={p.liked ? "currentColor" : "none"} />
              {p.likes}
            </button>
            <button onClick={() => setModal("comment:" + p.id)}>
              <MessageCircle size={17} />
              <span>{p.comments.length}</span>
              <span className="sr-only">
                {" "}
                commentaire{p.comments.length > 1 ? "s" : ""}
              </span>
            </button>
            <button
              aria-label="Sauvegarder cette publication"
              className={
                (data.savedPosts || []).includes(p.id) ? "saved-post" : ""
              }
              onClick={() =>
                update({
                  savedPosts: (data.savedPosts || []).includes(p.id)
                    ? (data.savedPosts || []).filter((id) => id !== p.id)
                    : [...(data.savedPosts || []), p.id],
                })
              }
            >
              <Bookmark
                size={18}
                fill={
                  (data.savedPosts || []).includes(p.id)
                    ? "currentColor"
                    : "none"
                }
              />
            </button>
            <button onClick={() => setModal("comment:" + p.id)}>
              Rejoindre la discussion <ArrowRight size={16} />
            </button>
          </div>
          {p.comments.map((c, i) => (
            <p className="comment" key={i}>
              {c}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
  return (
    <>
      <aside className="sidebar">
        <button className="brand" onClick={() => go("Accueil")}>
          K<span>o</span>uples<span>.</span>
        </button>
        <div className="club-label">LE CLUB DES BELLES HISTOIRES</div>
        <nav>
          {tabs.map((t) => (
            <button
              key={t.name}
              className={tab === t.name ? "selected" : ""}
              onClick={() => go(t.name)}
            >
              <t.icon size={20} />
              {t.name}
              {t.name === "IA" && <span className="tiny">VOTRE ALLIÉ</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="membership">
            <Leaf size={23} />
            <p>
              Le bonheur se cultive.<small>Et ça commence à deux.</small>
            </p>
          </div>
          <button className="account" onClick={() => go("Couple")}>
            <span className="double-avatar">
              S<span>J</span>
            </span>
            <div>
              <b>{data.members.join(" & ")}</b>
              <small>Membres du club</small>
            </div>
            <ChevronRight size={16} />
          </button>
        </div>
      </aside>
      <div className={"app-shell view-" + tab.toLowerCase()}>
        <header>
          <div className="mobile-brand brand">Kouples.</div>
          <div className="breadcrumb">
            Votre espace <span>/</span> {tab}
          </div>
          <div className="header-right">
            <span className="demo-pill">Version découverte</span>
            <button
              aria-label="Votre portefeuille"
              onClick={() => setModal("wallet")}
            >
              <Wallet size={20} />
            </button>
            <button
              aria-label="Notifications"
              onClick={() => {
                setToast(
                  "Vous êtes à jour. Votre prochaine aventure vous attend.",
                );
              }}
            >
              <Bell size={20} />
              <i />
            </button>
            <button className="header-avatar" onClick={() => go("Couple")}>
              <Photo src={pictures.julien} alt="Votre profil" />
            </button>
          </div>
        </header>
        <main>
          <div className="page-intro">
            <div>
              <span className="eyebrow">
                {tab === "Accueil"
                  ? "VOTRE HISTOIRE, JOUR APRÈS JOUR"
                  : "LE BONHEUR SE PARTAGE"}
              </span>
              <h1>
                {tab === "Accueil" ? (
                  <>
                    Bonjour, {data.members.join(" & ")}{" "}
                    <span className="sun">☀</span>
                  </>
                ) : tab === "Couple" ? (
                  "Juste vous deux."
                ) : tab === "IA" ? (
                  "Un peu d’aide, beaucoup d’idées."
                ) : tab === "Tribu" ? (
                  "Votre tribu vous attend."
                ) : (
                  "Les prestataires de la tribu"
                )}
              </h1>
              <p>
                {tab === "Accueil"
                  ? "Un grand oui à préparer. Et mille petits bonheurs à partager."
                  : tab === "Couple"
                    ? "Un espace pour votre histoire, vos envies et vos projets."
                    : tab === "IA"
                      ? "Votre assistant pour avancer ensemble, en toute sérénité."
                      : tab === "Tribu"
                        ? "Les mêmes envies, les mêmes questions. Une aventure à partager."
                        : "Des professionnels recommandés par d’autres couples, avec des avantages exclusifs."}
              </p>
            </div>
            {tab === "Accueil" && (
              <span className="intro-badge">
                <span /> VOTRE BELLE AVENTURE
              </span>
            )}
          </div>
          {tab === "Accueil" && (
            <>
              <section className="hero">
                <Photo
                  src={pictures.hero}
                  alt="Un couple de mariés partage un instant de bonheur"
                />
                <div className="hero-shade" />
                <div className="hero-top">
                  <span>VOTRE GRAND JOUR</span>
                  <button onClick={() => setModal("date")}>
                    <CalendarDays size={14} />
                    {new Date(data.date + "T12:00:00").toLocaleDateString(
                      "fr-FR",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </button>
                </div>
                <div className="hero-content">
                  <div className="countdown">
                    J−{days}
                    <span>
                      Encore {days} jours pour
                      <br />
                      écrire votre histoire.
                    </span>
                  </div>
                  <div className="hero-handwritten">
                    Le plus beau
                    <br />
                    est encore à venir.<span>♡</span>
                  </div>
                  <div className="hero-progress">
                    <div>
                      <span>Votre préparation</span>
                      <b>{42 + data.done.length * 10} %</b>
                    </div>
                    <div className="progress-track">
                      <span
                        style={{ width: `${42 + data.done.length * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <Section
                eyebrow="LES PETITES ATTENTIONS FONT LES GRANDES HISTOIRES"
                title="Vos mots du jour"
                action={
                  <button
                    className="private-label"
                    onClick={() => {
                      go("Couple");
                      setTimeout(
                        () =>
                          document.querySelector(".question")?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          }),
                        100,
                      );
                    }}
                  >
                    Une question pour vous rapprocher <ArrowRight size={16} />
                  </button>
                }
              >
                <Messages />
              </Section>
              <Section
                eyebrow="UN PAS DE PLUS VERS LE GRAND OUI"
                title="Votre prochaine action"
                action={
                  <button className="text-button" onClick={() => go("Couple")}>
                    Voir tout <ArrowRight size={16} />
                  </button>
                }
              >
                <div className="action-card">
                  <Photo src={pictures.rings} alt="Alliances de mariage" />
                  <div>
                    <span className="tag">
                      {data.done.includes(tasks[0])
                        ? "TERMINÉE"
                        : "À FAIRE ENSEMBLE"}
                    </span>
                    <h3>{tasks[0]}</h3>
                    <p>Comparez les styles et prenez rendez-vous.</p>
                    <span className="action-time">
                      <CalendarDays size={15} /> Cette semaine{" "}
                      <Clock3 size={15} /> 30 min
                    </span>
                  </div>
                  <button
                    className="round-arrow"
                    aria-label="Voir l’action alliances"
                    onClick={() => setModal("action")}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </Section>
              <Section
                eyebrow="VOUS N’ÊTES PAS LES SEULS À DIRE OUI"
                title="La tribu des mariés"
                action={
                  <button className="text-button" onClick={() => go("Tribu")}>
                    Voir le réseau <ArrowRight size={16} />
                  </button>
                }
              >
                <Profiles />
                <Feed />
              </Section>
              <section className="witness-banner">
                <div className="witness-art">
                  <Users size={39} />
                  <span>✦</span>
                </div>
                <div>
                  <span className="eyebrow">
                    BIEN ENTOURÉS, TOUT EST PLUS BEAU
                  </span>
                  <h2>
                    Vos témoins font aussi
                    <br />
                    partie de l’aventure.
                  </h2>
                  <p>
                    Un peu d’aide, beaucoup d’amour. Invitez vos complices
                    <br className="desktop-br" /> et préparez les plus beaux
                    moments ensemble.
                  </p>
                  <button
                    className="dark-button"
                    onClick={() => setModal("witness")}
                  >
                    Inviter nos témoins <Plus size={16} />
                  </button>
                </div>
                <span className="decor-flower">✳</span>
              </section>
              <Section
                eyebrow="DE BELLES ADRESSES, RECOMMANDÉES AVEC AMOUR"
                title="Les prestataires de la tribu"
                action={
                  <button className="text-button" onClick={() => go("Offres")}>
                    Voir tous <ArrowRight size={16} />
                  </button>
                }
              >
                <p className="demo-notice">
                  Des professionnels recommandés par d’autres couples,
                  <br />
                  avec des avantages exclusifs.{" "}
                  <span>Offres fictives de démonstration.</span>
                </p>
                <div className="category-list home-categories">
                  {[
                    "Tout",
                    "Lieux de réception",
                    "Traiteurs",
                    "Photographes",
                    "Costumes",
                    "Sport",
                    "Spas et expériences",
                  ].map((c) => (
                    <button
                      key={c}
                      className={category === c ? "active" : ""}
                      onClick={() => setCategory(c)}
                    >
                      {(
                        {
                          Tout: "Tous",
                          "Lieux de réception": "Lieu",
                          Traiteurs: "Traiteur",
                          Photographes: "Photo",
                          Costumes: "Tenue",
                          "Spas et expériences": "Beauté",
                        } as Record<string, string>
                      )[c] || c}
                    </button>
                  ))}
                </div>
                <div className="offers-grid">
                  {(category === "Tout"
                    ? offers.slice(0, 3)
                    : offers.filter((o) => o.category === category)
                  ).map((o) => (
                    <OfferCard key={o.id} offer={o} />
                  ))}
                </div>
              </Section>
              <div className="closing">
                <Heart size={22} />
                <h2>
                  Le mariage dure un jour.
                  <br />
                  <em>Votre histoire, toute la vie.</em>
                </h2>
                <p>On est heureux d’en faire un petit bout avec vous.</p>
                <span className="brand">
                  Kouples<span>.</span>
                </span>
              </div>
            </>
          )}
          {tab === "Couple" && (
            <>
              <div className="couple-cover">
                <Heart size={32} />
                <h2>{data.members.join(" & ")}</h2>
                <p>
                  Notre grand oui ·{" "}
                  {new Date(data.date + "T12:00:00").toLocaleDateString(
                    "fr-FR",
                  )}
                </p>
                <button
                  className="text-button"
                  onClick={() => setModal("date")}
                >
                  Modifier notre date <CalendarDays size={16} />
                </button>
              </div>
              <Section
                title="Votre duo"
                action={
                  <button
                    className="text-button"
                    onClick={() => setModal("profiles")}
                  >
                    Modifier nos profils
                  </button>
                }
              >
                <div className="duo-profiles">
                  {data.members.map((name, i) => (
                    <div className="panel" key={i}>
                      <span className="avatar">{name.slice(0, 1)}</span>
                      <h3>{name}</h3>
                      <small>Membre du couple · démo</small>
                    </div>
                  ))}
                </div>
              </Section>
              <Section title="Vos mots, votre bulle">
                <Messages />
              </Section>
              <div className="two-columns">
                <Section title="Votre checklist">
                  <div className="panel">
                    {tasks.map((t) => (
                      <button
                        key={t}
                        className="task"
                        onClick={() => toggle("done", t)}
                      >
                        <span
                          className={
                            "checkbox " +
                            (data.done.includes(t) ? "checked" : "")
                          }
                        >
                          {data.done.includes(t) && <Check size={14} />}
                        </span>
                        <span
                          className={data.done.includes(t) ? "striked" : ""}
                        >
                          {t}
                        </span>
                      </button>
                    ))}
                  </div>
                </Section>
                <Section
                  title="Le budget à deux"
                  action={
                    <button
                      className="text-button"
                      onClick={() => setModal("budget")}
                    >
                      Modifier
                    </button>
                  }
                >
                  <div className="panel">
                    <span className="eyebrow">
                      PRÉVISIONNEL · DÉMONSTRATION
                    </span>
                    <h2>
                      {data.expenses
                        .reduce((s, e) => s + e.amount, 0)
                        .toLocaleString("fr-FR")}{" "}
                      € <small>/ {data.budget.toLocaleString("fr-FR")} €</small>
                    </h2>
                    {data.expenses.map((e, i) => (
                      <div className="budget-row" key={i}>
                        <span>{e.name}</span>
                        <b>{e.amount} €</b>
                      </div>
                    ))}
                    <button
                      className="text-button"
                      onClick={() => setModal("expense")}
                    >
                      <Plus size={15} />
                      Ajouter une dépense prévue
                    </button>
                  </div>
                </Section>
              </div>
              <Section title="La question du jour">
                <div className="question panel">
                  <Sparkles />
                  <h3>Quel petit moment à deux aimeriez-vous revivre ?</h3>
                  {data.answer && <p>{data.answer}</p>}
                  <button
                    className="dark-button"
                    onClick={() => setModal("answer")}
                  >
                    {data.answer
                      ? "Modifier notre réponse"
                      : "Prendre un instant pour répondre"}
                  </button>
                </div>
              </Section>
              <Section
                title="Nos souvenirs"
                action={
                  <button
                    className="text-button"
                    onClick={() => setModal("memory")}
                  >
                    <Plus size={16} />
                    Ajouter
                  </button>
                }
              >
                <div className="panel">
                  {data.memories.length ? (
                    data.memories.map((m, i) => <p key={i}>♡ {m}</p>)
                  ) : (
                    <p>
                      Votre premier rendez-vous, un voyage, un fou rire… gardez
                      ici vos moments précieux.
                    </p>
                  )}
                </div>
              </Section>
              <Section title="Nos témoins">
                <button
                  className="dark-button"
                  onClick={() => setModal("witness")}
                >
                  Gérer les témoins <Users size={17} />
                </button>
              </Section>
            </>
          )}
          {tab === "IA" && (
            <section className="chat panel">
              <div className="assistant-heading">
                <span className="assistant-icon">
                  <Sparkles size={24} />
                </span>
                <h2>Votre allié pour les beaux jours.</h2>
                <p>Organisation, inspirations et moments à deux.</p>
                <span className="demo-pill">
                  Réponses de démonstration · Aucune API connectée
                </span>
              </div>
              <div className="suggestions">
                {[
                  "Aide-nous à organiser notre mariage.",
                  "Comment réduire notre budget fleurs ?",
                  "Trouve-nous une activité à faire à deux.",
                  "Quelles sont nos prochaines étapes ?",
                ].map((t) => (
                  <button key={t} onClick={() => send(t)}>
                    {t}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
              <div aria-live="polite">
                {data.chat.map((m, i) => (
                  <div key={i} className={"chat-bubble " + m.role}>
                    <small>
                      {m.role === "user"
                        ? "Vous deux"
                        : "Assistant Kouples · Démonstration"}
                    </small>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
              <form
                className="chat-input"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
              >
                <input
                  aria-label="Votre demande à l’assistant"
                  placeholder="Et si on préparait la suite ensemble ?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="dark-button" aria-label="Envoyer">
                  <Send size={19} />
                </button>
              </form>
            </section>
          )}
          {tab === "Tribu" && (
            <>
              <div className="filters">
                <select
                  aria-label="Ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  {["Toutes les villes", ...couples.map((c) => c.city)].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    ),
                  )}
                </select>
                <select
                  aria-label="Période de mariage"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {["Toutes les périodes", ...couples.map((c) => c.month)].map(
                    (c) => (
                      <option key={c}>{c}</option>
                    ),
                  )}
                </select>
              </div>
              <Section title="De belles rencontres">
                <Profiles />
                {!couples.some(
                  (c) =>
                    (city === "Toutes les villes" || c.city === city) &&
                    (month === "Toutes les périodes" || c.month === month),
                ) && (
                  <p>
                    Aucun couple pour ces filtres. Essayez une autre période.
                  </p>
                )}
              </Section>
              <Section title="Ensemble, on va plus loin">
                <div className="group-card panel">
                  <Leaf />
                  <div>
                    <span className="tag">ACHAT COLLECTIF FICTIF</span>
                    <h3>Des fleurs pour nos grands jours</h3>
                    <p>Atelier Pivoine · −20 % si 5 couples se réunissent</p>
                    <div className="progress-track">
                      <span
                        style={{
                          width: data.joined.includes("fleurs") ? "80%" : "60%",
                        }}
                      />
                    </div>
                    <p>
                      {data.joined.includes("fleurs") ? 4 : 3} couples sur 5 ·
                      Participation de démonstration
                    </p>
                    <button
                      className="dark-button"
                      onClick={() => toggle("joined", "fleurs")}
                    >
                      {data.joined.includes("fleurs")
                        ? "Quitter le groupe"
                        : "Rejoindre l’achat collectif"}
                    </button>
                  </div>
                </div>
                <button
                  className="text-button"
                  onClick={() => setModal("group")}
                >
                  <Plus size={16} />
                  Créer un groupe
                </button>
                {data.groups.map((g) => (
                  <div className="panel budget-row" key={g}>
                    <span>{g} · 1 couple / 5</span>
                    <button
                      className="text-button"
                      onClick={() => toggle("groups", g)}
                    >
                      Quitter
                    </button>
                  </div>
                ))}
              </Section>
              <Section
                title="Les nouvelles de la tribu"
                action={
                  <button
                    className="dark-button"
                    onClick={() => setModal("post")}
                  >
                    <Plus size={16} />
                    Publier
                  </button>
                }
              >
                <Feed />
              </Section>
            </>
          )}
          {tab === "Offres" && (
            <>
              <button
                className="wallet-banner"
                onClick={() => setModal("wallet")}
              >
                <span>
                  <Wallet />
                  <b>Votre portefeuille de petits bonheurs</b>
                  <small>
                    {data.favorites.length} offre(s) sauvegardée(s) ·{" "}
                    {data.joined.length} participation(s)
                  </small>
                </span>
                <ArrowRight />
              </button>
              <p className="demo-notice">
                Catalogue fictif de démonstration. Aucune offre disponible à
                l’achat. Aucun paiement.
              </p>
              <div className="category-list">
                {[
                  "Tout",
                  ...Array.from(new Set(offers.map((o) => o.category))),
                ].map((c) => (
                  <button
                    key={c}
                    className={category === c ? "active" : ""}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="offers-grid">
                {offers
                  .filter((o) => category === "Tout" || o.category === category)
                  .map((o) => (
                    <OfferCard key={o.id} offer={o} />
                  ))}
              </div>
            </>
          )}
          <footer>
            Fait pour les histoires qui durent.{" "}
            <span>
              Kouples. · Démonstration · Données enregistrées sur cet appareil
              uniquement
            </span>
          </footer>
        </main>
      </div>
      <nav className="bottom-nav">
        {tabs.map((t) => (
          <button
            key={t.name}
            className={tab === t.name ? "selected" : ""}
            onClick={() => go(t.name)}
          >
            <t.icon size={21} />
            <span>{t.name}</span>
          </button>
        ))}
      </nav>
      {toast && (
        <div role="status" className="toast">
          <CheckCheck size={18} />
          {toast}
        </div>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal("")}>
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Détails et modification"
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Fermer"
              onClick={() => setModal("")}
            >
              <X />
            </button>
            {modal.startsWith("message") && (
              <>
                <span className="eyebrow">VOTRE ESPACE PRIVÉ</span>
                <h2>Un mot pour l’autre.</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    const m = [...data.messages];
                    m[Number(f.get("author"))] = String(f.get("text"));
                    update({ messages: m });
                    setModal("");
                    setToast("Votre petit mot est enregistré");
                  }}
                >
                  <label>
                    De la part de
                    <select
                      name="author"
                      value={modal.slice(-1)}
                      onChange={(e) => setModal("message" + e.target.value)}
                    >
                      <option value="0">{data.members[0]}</option>
                      <option value="1">{data.members[1]}</option>
                    </select>
                  </label>
                  <label>
                    Votre message
                    <textarea
                      key={modal}
                      name="text"
                      required
                      maxLength={1000}
                      defaultValue={data.messages[Number(modal.slice(-1))]}
                    />
                  </label>
                  <p className="muted">
                    Les témoins ne disposent d’aucun accès à cet espace. Cette
                    démo reste locale sur cet appareil.
                  </p>
                  <button className="dark-button">
                    Enregistrer mon mot <Heart size={16} />
                  </button>
                </form>
              </>
            )}
            {modal === "action" && (
              <>
                <Photo
                  className="modal-image"
                  src={pictures.rings}
                  alt="Alliances"
                />
                <h2>Choisir vos alliances</h2>
                <p>
                  Comparez vos envies : matière, forme, gravure et budget.
                  Prenez rendez-vous chez un bijoutier et essayez les alliances
                  à deux.
                </p>
                <ul>
                  <li>Définir une enveloppe commune.</li>
                  <li>Préparer deux ou trois inspirations.</li>
                  <li>Vérifier les délais et les tailles.</li>
                </ul>
                <button
                  className="dark-button"
                  onClick={() => {
                    toggle("done", tasks[0]);
                    setModal("");
                  }}
                >
                  {data.done.includes(tasks[0])
                    ? "Remettre à faire"
                    : "Marquer comme terminée"}
                  <Check size={17} />
                </button>
              </>
            )}
            {modal === "profiles" && (
              <>
                <h2>Votre duo</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    update({
                      members: [
                        String(f.get("first")).trim(),
                        String(f.get("second")).trim(),
                      ],
                    });
                    setModal("");
                  }}
                >
                  <label>
                    Premier prénom
                    <input
                      name="first"
                      required
                      maxLength={35}
                      defaultValue={data.members[0]}
                    />
                  </label>
                  <label>
                    Deuxième prénom
                    <input
                      name="second"
                      required
                      maxLength={35}
                      defaultValue={data.members[1]}
                    />
                  </label>
                  <button className="dark-button">Enregistrer</button>
                </form>
              </>
            )}
            {modal === "date" && (
              <>
                <h2>Votre grand jour</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    update({
                      date: String(f.get("date")),
                      auto: f.get("auto") === "on",
                    });
                    setModal("");
                  }}
                >
                  <label>
                    Date du mariage
                    <input
                      type="date"
                      name="date"
                      required
                      defaultValue={data.date}
                    />
                  </label>
                  <label className="check-label">
                    <input
                      type="checkbox"
                      name="auto"
                      defaultChecked={data.auto}
                    />{" "}
                    Calculer automatiquement le compte à rebours
                  </label>
                  <p className="muted">
                    Sans cette option, la démonstration affiche J−194.
                  </p>
                  <button className="dark-button">Enregistrer</button>
                </form>
              </>
            )}
            {modal === "witness" && (
              <>
                <h2>Vos complices du grand jour</h2>
                <p className="muted">
                  Invitations simulées, sans envoi réel. Les mots privés du
                  couple sont toujours exclus.
                </p>
                {data.witnesses.map((w, i) => (
                  <div className="panel witness-item" key={i}>
                    <b>{w.name}</b>
                    <p>Mission : {w.mission}</p>
                    <small>
                      Accès :{" "}
                      {[
                        w.planning && "planning",
                        w.budget && "budget",
                        w.party && "EVG / EVJF",
                      ]
                        .filter(Boolean)
                        .join(", ") || "mission uniquement"}
                    </small>
                    <button
                      className="text-button"
                      onClick={() =>
                        update({
                          witnesses: data.witnesses.filter((_, j) => i !== j),
                        })
                      }
                    >
                      Retirer
                    </button>
                  </div>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    update({
                      witnesses: [
                        ...data.witnesses,
                        {
                          name: String(f.get("name")),
                          mission: String(f.get("mission")),
                          planning: f.get("planning") === "on",
                          budget: f.get("budget") === "on",
                          party: f.get("party") === "on",
                        },
                      ],
                    });
                    e.currentTarget.reset();
                    setToast("Témoin ajouté à la démonstration");
                  }}
                >
                  <label>
                    Prénom
                    <input name="name" required placeholder="Ex. Camille" />
                  </label>
                  <label>
                    Mission
                    <input
                      name="mission"
                      required
                      placeholder="Ex. Préparer la playlist"
                    />
                  </label>
                  {[
                    ["planning", "Partager le planning"],
                    ["budget", "Partager le budget"],
                    ["party", "Préparer les EVG / EVJF"],
                  ].map(([key, title]) => (
                    <label className="check-label" key={key}>
                      <input name={key} type="checkbox" />
                      {title}
                    </label>
                  ))}
                  <button className="dark-button">
                    Ajouter le témoin <Plus size={16} />
                  </button>
                </form>
              </>
            )}
            {modal === "wallet" && (
              <>
                <span className="eyebrow">VOS AVANTAGES, EN TOUTE CLARTÉ</span>
                <h2>Votre portefeuille</h2>
                <div className="wallet-numbers">
                  <div>
                    <small>Économies confirmées</small>
                    <h2>0 €</h2>
                    <p>Aucun avantage utilisé.</p>
                  </div>
                  <div>
                    <small>Économies potentielles · démo</small>
                    <h2>
                      {offers
                        .filter((o) => data.joined.includes(o.id))
                        .reduce((s, o) => s + o.saving, 0)}{" "}
                      €
                    </h2>
                    <p>Estimations fictives, non obtenues.</p>
                  </div>
                </div>
                <h3>Offres sauvegardées</h3>
                {offers
                  .filter((o) => data.favorites.includes(o.id))
                  .map((o) => (
                    <p key={o.id}>
                      ♡ {o.name} · {o.individual}
                    </p>
                  ))}
                {!data.favorites.length && (
                  <p>Aucune pour le moment. Touchez le cœur d’une offre.</p>
                )}
                <h3>Participations en cours · démo</h3>
                {offers
                  .filter((o) => data.joined.includes(o.id))
                  .map((o) => (
                    <p key={o.id}>
                      {o.name} · {o.collective}
                    </p>
                  ))}
                {!data.joined.length && (
                  <p>Aucune participation pour le moment.</p>
                )}
              </>
            )}
            {[
              "budget",
              "expense",
              "memory",
              "answer",
              "post",
              "group",
            ].includes(modal) && (
              <>
                <h2>
                  {
                    {
                      budget: "Notre budget",
                      expense: "Une dépense prévue",
                      memory: "Un souvenir à garder",
                      answer: "Un moment rien qu’à vous",
                      post: "Un mot à la tribu",
                      group: "Votre nouveau groupe",
                    }[modal]
                  }
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget),
                      text = String(f.get("text") || "");
                    if (modal === "budget")
                      update({ budget: Number(f.get("amount")) });
                    if (modal === "expense")
                      update({
                        expenses: [
                          ...data.expenses,
                          { name: text, amount: Number(f.get("amount")) },
                        ],
                      });
                    if (modal === "memory")
                      update({ memories: [...data.memories, text] });
                    if (modal === "answer") update({ answer: text });
                    if (modal === "group")
                      update({ groups: [...data.groups, text] });
                    if (modal === "post")
                      update({
                        posts: [
                          {
                            id: Date.now(),
                            author: data.members.join(" & "),
                            text,
                            likes: 0,
                            liked: false,
                            comments: [],
                          },
                          ...data.posts,
                        ],
                      });
                    setModal("");
                    setToast("Enregistré sur cet appareil");
                  }}
                >
                  {modal !== "budget" && (
                    <label>
                      {modal === "expense"
                        ? "Intitulé"
                        : modal === "group"
                          ? "Nom du groupe"
                          : "Votre texte"}
                      <textarea
                        name="text"
                        required
                        maxLength={2000}
                        defaultValue={modal === "answer" ? data.answer : ""}
                      />
                    </label>
                  )}
                  {["budget", "expense"].includes(modal) && (
                    <label>
                      Montant en euros
                      <input
                        name="amount"
                        type="number"
                        min="1"
                        max="1000000"
                        required
                        defaultValue={
                          modal === "budget" ? data.budget : undefined
                        }
                      />
                    </label>
                  )}
                  <button className="dark-button">
                    Enregistrer <Check size={16} />
                  </button>
                </form>
              </>
            )}
            {(modal.startsWith("comment:") ||
              modal.startsWith("discussion:")) && (
              <>
                <h2>
                  {modal.startsWith("discussion:")
                    ? "Discuter avec " + modal.split(":")[1]
                    : "Participer à la discussion"}
                </h2>
                <p className="muted">
                  Discussion locale de démonstration, aucun message envoyé à une
                  personne réelle.
                </p>
                {modal.startsWith("comment:") &&
                  data.posts
                    .find((post) => post.id === Number(modal.split(":")[1]))
                    ?.comments.map((comment, index) => (
                      <p className="comment" key={index}>
                        {comment}
                      </p>
                    ))}
                {modal.startsWith("discussion:") &&
                  (data.conversations[modal.split(":")[1]] || []).map(
                    (text, i) => (
                      <p className="comment" key={i}>
                        {text}
                      </p>
                    ),
                  )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const text = String(
                      new FormData(e.currentTarget).get("text"),
                    );
                    if (modal.startsWith("comment:"))
                      update({
                        posts: data.posts.map((p) =>
                          p.id === Number(modal.split(":")[1])
                            ? {
                                ...p,
                                comments: [
                                  ...p.comments,
                                  data.members.join(" & ") + " : " + text,
                                ],
                              }
                            : p,
                        ),
                      });
                    else {
                      const recipient = modal.split(":")[1];
                      update({
                        conversations: {
                          ...data.conversations,
                          [recipient]: [
                            ...(data.conversations[recipient] || []),
                            text,
                          ],
                        },
                      });
                    }
                    setModal("");
                    setToast("Message enregistré en démonstration");
                  }}
                >
                  <label>
                    Votre message
                    <textarea name="text" required maxLength={2000} />
                  </label>
                  <button className="dark-button">
                    Envoyer <Send size={16} />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}

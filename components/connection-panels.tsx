"use client";
import {
  ArrowRight,
  Check,
  Coffee,
  Copy,
  Gift,
  MapPin,
  MessageCircle,
  Share2,
  Sparkles,
} from "lucide-react";
import { couples, type Data } from "../lib/demo";
import {
  coupleDetails,
  creditAmount,
  distanceKm,
  distanceText,
  homeCities,
  interestChoices,
  interestPhrase,
} from "../lib/connections";
import { Portrait } from "./portrait";
type Props = {
  modal: string;
  data: Data;
  update: (patch: Partial<Data>) => void;
  setModal: (modal: string) => void;
  notify: (message: string) => void;
  openConversation: (name: string, draft?: string) => void;
  referralCode: string;
  referralUrl: string;
};
export function ConnectionPanels({
  modal,
  data,
  update,
  setModal,
  notify,
  openConversation,
  referralCode,
  referralUrl,
}: Props) {
  const index = couples.findIndex(
      (c) => c.name === modal.split(":").slice(1).join(":"),
    ),
    couple = couples[index],
    details = coupleDetails[index];
  const origin = homeCities[data.homeCity] || homeCities.Paris;
  const balance = creditAmount(data.subscriptionMonths);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      notify("Lien de parrainage copié");
    } catch {
      notify("Sélectionnez le lien ci-dessous pour le copier.");
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rejoignez-nous sur Kouples.",
          text: "On prépare notre mariage sur Kouples. Venez découvrir la tribu avec nous !",
          url: referralUrl,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    await copy();
  };
  if (modal === "credit")
    return (
      <>
        <span className="eyebrow">BY MONSIEUR · SIMULATION</span>
        <h2>Chaque mois compte.</h2>
        <p>
          Votre couple cumule{" "}
          <b>100 € de réduction pour chaque mois d’abonnement validé</b>.
        </p>
        <div className="credit-modal-total">
          <strong>{balance.toLocaleString("fr-FR")} €</strong>
          <span>
            {data.subscriptionMonths} mois validés dans cette démonstration
          </span>
        </div>
        <p className="muted">
          Ce crédit est simulé : aucun abonnement réel n’a été facturé et aucune
          réduction réelle n’est confirmée. Il reste distinct de vos économies
          obtenues.
        </p>
        <button
          className="dark-button"
          onClick={() =>
            update({
              subscriptionMonths: Math.max(0, data.subscriptionMonths) + 1,
            })
          }
        >
          Simuler un mois supplémentaire · +100 € <ArrowRight size={17} />
        </button>
        <button
          className="text-button panel-link"
          onClick={() => update({ subscriptionMonths: 3 })}
        >
          Revenir à la simulation de 3 mois
        </button>
      </>
    );
  if (modal === "location")
    return (
      <>
        <span className="eyebrow">VOTRE COUPLE, VOTRE QUARTIER</span>
        <h2>Des rencontres près de vous.</h2>
        <p>
          Choisissez votre ville et vos envies pour personnaliser les
          rencontres.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            update({
              homeCity: String(form.get("city")),
              interests: form.getAll("interest").map(String),
            });
            setModal("");
            notify("Vos rencontres sont personnalisées");
          }}
        >
          <label>
            Ville de votre couple
            <select name="city" defaultValue={data.homeCity || "Paris"}>
              {Object.keys(homeCities).map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </label>
          <fieldset className="interest-choices">
            <legend>Ce qui vous ressemble</legend>
            {interestChoices.map((interest) => (
              <label className="check-label" key={interest}>
                <input
                  type="checkbox"
                  name="interest"
                  value={interest}
                  defaultChecked={(data.interests || []).includes(interest)}
                />
                {interest}
              </label>
            ))}
          </fieldset>
          <p className="muted">
            Distances indicatives à vol d’oiseau, calculées entre des positions
            de démonstration proches des centres-villes. Aucune position GPS
            personnelle n’est utilisée.
          </p>
          <button className="dark-button">
            Personnaliser les rencontres <Check size={17} />
          </button>
        </form>
      </>
    );
  if (modal === "referral")
    return (
      <>
        <span className="eyebrow">LES BELLES HISTOIRES SE PARTAGENT</span>
        <h2>Invitez un couple ami.</h2>
        <p>
          Un mariage à préparer, des idées à partager… faites-leur découvrir
          votre tribu.
        </p>
        <div className="referral-code">
          <Gift size={25} />
          <span>
            Votre code de parrainage<b>{referralCode}</b>
          </span>
        </div>
        <label>
          Votre lien à partager
          <input
            readOnly
            value={referralUrl}
            onFocus={(event) => event.currentTarget.select()}
            aria-label="Votre lien de parrainage"
          />
        </label>
        <div className="referral-buttons">
          <button className="dark-button" onClick={share}>
            <Share2 size={17} />
            Partager avec un ami
          </button>
          <button className="outline-button" onClick={copy}>
            <Copy size={17} />
            Copier mon lien
          </button>
        </div>
        <p className="muted">
          Lien de démonstration. Aucun abonnement ni avantage financier n’est
          activé par son partage.
        </p>
      </>
    );
  if (index < 0) return null;
  const distance = distanceText(distanceKm(origin, details));
  const shared = details.interests.filter((i) =>
    (data.interests || []).includes(i),
  );
  if (modal.startsWith("profile:"))
    return (
      <>
        <Portrait
          kind="couple"
          index={index}
          alt={"Portrait illustratif de " + couple.name}
          className="profile-portrait"
        />
        <span className="eyebrow">LES VISAGES DE LA TRIBU · DÉMO</span>
        <h2>{couple.name}</h2>
        <p className="profile-distance">
          <MapPin size={17} />
          {couple.city} · {distance}
        </p>
        <p>{details.bio}</p>
        <div className="profile-interests">
          {details.interests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
        <p>
          {shared.length
            ? `${shared.length} envie${shared.length > 1 ? "s" : ""} en commun : ${shared.join(", ")}.`
            : "De nouvelles envies à découvrir ensemble."}
        </p>
        <div className="profile-buttons">
          <button
            className="dark-button"
            onClick={() => setModal("icebreaker:" + couple.name)}
          >
            <Sparkles size={17} />
            Briser la glace
          </button>
          <button
            className="outline-button"
            onClick={() => setModal("coffee:" + couple.name)}
          >
            <Coffee size={17} />
            Proposer un café
          </button>
          <button
            className="text-button"
            onClick={() => openConversation(couple.name)}
          >
            Leur écrire <MessageCircle size={17} />
          </button>
        </div>
        <p className="muted">
          Couple et portrait d’illustration. Les échanges restent locaux dans
          cette démonstration.
        </p>
      </>
    );
  if (modal.startsWith("icebreaker:"))
    return (
      <>
        <span className="eyebrow">UN PETIT MOT, UNE BELLE RENCONTRE</span>
        <h2>On dit bonjour à {couple.name} ?</h2>
        <p>
          Choisissez une idée pour commencer. Vous pourrez modifier le message
          avant de l’enregistrer.
        </p>
        <div className="icebreaker-options">
          {[
            "Vous avez déjà trouvé votre lieu de réception ?",
            "On échange nos meilleurs bons plans mariage ?",
            shared[0]
              ? `Nous aussi, on aime ${interestPhrase(shared[0])} ! On en discute ?`
              : "Ça vous dirait un café pour faire connaissance ?",
          ].map((text) => (
            <button
              key={text}
              onClick={() => openConversation(couple.name, text)}
            >
              {text}
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
      </>
    );
  if (modal.startsWith("coffee:")) {
    const existing = (data.coffeeInvites || []).find(
      (invite) => invite.couple === couple.name,
    );
    return (
      <>
        <h2>Un café avec {couple.name} ?</h2>
        <p>
          Pas besoin d’attendre le grand jour pour faire une belle rencontre.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            update({
              coffeeInvites: [
                ...(data.coffeeInvites || []).filter(
                  (i) => i.couple !== couple.name,
                ),
                {
                  couple: couple.name,
                  date: String(form.get("date")),
                  message: String(form.get("message")),
                },
              ],
            });
            setModal("");
            notify("Invitation café enregistrée en démonstration");
          }}
        >
          <label>
            Date proposée
            <input
              type="date"
              name="date"
              required
              min={new Date().toISOString().slice(0, 10)}
              defaultValue={existing?.date}
            />
          </label>
          <label>
            Votre invitation
            <textarea
              name="message"
              required
              maxLength={1000}
              defaultValue={
                existing?.message ||
                "On serait ravis de faire connaissance autour d’un café et de partager nos idées mariage !"
              }
            />
          </label>
          <button className="dark-button">
            Enregistrer l’invitation <Coffee size={17} />
          </button>
        </form>
        {existing && (
          <button
            className="text-button panel-link"
            onClick={() => {
              update({
                coffeeInvites: (data.coffeeInvites || []).filter(
                  (i) => i.couple !== couple.name,
                ),
              });
              setModal("");
            }}
          >
            Annuler notre proposition
          </button>
        )}
        <p className="muted">
          Invitation simulée, enregistrée sur cet appareil. Aucun rendez-vous
          réel ni message externe n’est envoyé.
        </p>
      </>
    );
  }
  if (modal.startsWith("compare:"))
    return (
      <>
        <span className="eyebrow">ON AVANCE ENSEMBLE</span>
        <h2>Vos préparatifs, côte à côte.</h2>
        <p>Un point de départ pour échanger des idées avec {couple.name}.</p>
        <div className="compare-progress">
          {[
            {
              name: data.members.join(" & "),
              value: 42 + data.done.length * 10,
            },
            { name: couple.name, value: details.preparation },
          ].map((row) => (
            <div key={row.name}>
              <p>
                <b>{row.name}</b>
                <span>{row.value} %</span>
              </p>
              <div className="progress-track">
                <span style={{ width: row.value + "%" }} />
              </div>
            </div>
          ))}
        </div>
        <p className="muted">
          Avancement illustratif partagé dans la démo. Les petits mots et
          informations privées du couple ne sont jamais affichés ici.
        </p>
        <button
          className="dark-button"
          onClick={() =>
            openConversation(
              couple.name,
              "On avance sur nos préparatifs ! Vous en êtes où pour les alliances et le traiteur ?",
            )
          }
        >
          Échanger nos idées <MessageCircle size={17} />
        </button>
      </>
    );
  return null;
}

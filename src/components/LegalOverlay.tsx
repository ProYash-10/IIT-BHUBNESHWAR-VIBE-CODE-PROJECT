import { useState, useEffect } from 'react';

type LegalTab = 'terms' | 'privacy' | 'compliance';

interface LegalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export function LegalOverlay({ isOpen, onClose, initialTab = 'terms' }: LegalOverlayProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oceanic-noir/80 backdrop-blur-md animate-fade-in-up">
      <div 
        className="relative w-full max-w-4xl h-[85vh] bg-white border border-mystic-mint rounded-3xl shadow-2xl flex flex-col overflow-hidden text-oceanic-noir font-sans"
        id="legal-modal-container"
      >
        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-mystic-mint/80 p-6 md:p-8 shrink-0 bg-arctic-powder">
          <div className="col-span-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2 text-nocturnal-expedition/60 font-mono text-[10px] font-bold tracking-widest uppercase">
              <span>\\\</span>
              <span>Regulatory Governance &amp; Legal Framework</span>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-oceanic-noir">
              Compliance, Privacy &amp; Terms
            </h2>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <button
              onClick={onClose}
              className="p-3 rounded-full hover:bg-mystic-mint/50 transition-colors border border-mystic-mint/80 text-oceanic-noir font-mono text-xs font-bold cursor-pointer"
              aria-label="Close modal"
              id="legal-modal-close"
            >
              [ ESC // CLOSE ]
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-mystic-mint/50 bg-white p-2 md:p-4 gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-oceanic-noir text-arctic-powder shadow-sm'
                : 'text-nocturnal-expedition/70 hover:text-oceanic-noir hover:bg-arctic-powder'
            }`}
          >
            01 // TERMS OF USE
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-oceanic-noir text-arctic-powder shadow-sm'
                : 'text-nocturnal-expedition/70 hover:text-oceanic-noir hover:bg-arctic-powder'
            }`}
          >
            02 // PRIVACY POLICY
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'compliance'
                ? 'bg-oceanic-noir text-arctic-powder shadow-sm'
                : 'text-nocturnal-expedition/70 hover:text-oceanic-noir hover:bg-arctic-powder'
            }`}
          >
            03 // COMPLIANCE &amp; SOC AUDITS
          </button>
        </div>

        {/* Document Content Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white">
          {activeTab === 'terms' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 1.0 ACCEPTANCE OF THE HIGH-PERFORMANCE PLATFORM SERVICE</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  By accessing, configuring, or establishing system API integration webhooks with the Data Automation SaaS pipeline gateway, you irrevocably agree to comply with and be bound by these Terms of Use. If you represent an enterprise or legal entity, your ingestion pipeline authorization binds that entity to these exact covenants.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 2.0 API RATE-LIMITING AND FAIR USE POLICY</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  To guarantee absolute sub-millisecond query delivery times, our ingestion clusters enforce active backpressure throttling policies:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-nocturnal-expedition/70 space-y-1">
                  <li><strong>Developer Tier:</strong> Ingestion capped at 1,000 requests per minute with soft overflow.</li>
                  <li><strong>Scale Tier:</strong> Ingestion optimized up to 50,000 telemetry packets per second globally.</li>
                  <li><strong>Enterprise CDC:</strong> Customized SLAs with dedicated non-blocking thread scheduling rings.</li>
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 3.0 DATA INTEGRITY &amp; INTELLECTUAL PROPERTY OF INGESTION SCHEMAS</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  Our stream engines automatically compile and serialize inbound JSON packets into logical schema structures. You retain full exclusive ownership of all raw data payload inputs. However, you grant our server nodes a non-exclusive, sub-licensable license to translate, compress, route, and buffer payloads solely to satisfy operational pipeline delivery.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 4.0 EXCLUSION OF SYSTEM LIABILITY &amp; UPTIME REFUNDS</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  While our production environment guarantees a 99.999% Service Level Agreement (SLA) for Enterprise connections, no platform is immune to third-party cloud routing failures. Standard tiers are provided on an "as-is" and "as-available" basis. In no event shall our platform or our cloud ingestion nodes be liable for lost profits, packet degradation, queue buffer failures, or database logs drift exceeding the total fees paid by you in the 12 months prior.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 1.0 SECURE ENCRYPTION PARADIGMS AND PAYLOAD CONTROL</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  Your privacy is preserved at the hardware level. All streaming connections traversing our API proxy endpoints enforce mandatory TLS 1.3 socket negotiation. Payload data in memory buffers utilizes temporary ephemeral ring storage, ensuring no persistent storage caching is written to non-volatile disk blocks without your opt-in configurations. Saved transaction logs are locked using AES-256 standard keys.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 2.0 GLOBAL DATA RETENTION SCHEMAS</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  We maintain strict, granular control over data expiration times:
                </p>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-arctic-powder border border-mystic-mint/50 p-3 rounded-xl">
                    <span className="text-nocturnal-expedition/40 block">TEMPORARY CDC BUFFER</span>
                    <span className="text-oceanic-noir font-bold font-sans">Automatic Purge after 24 Hours</span>
                  </div>
                  <div className="bg-arctic-powder border border-mystic-mint/50 p-3 rounded-xl">
                    <span className="text-nocturnal-expedition/40 block">METADATA LOG INDEXES</span>
                    <span className="text-oceanic-noir font-bold font-sans">Retained 7 Days for SLA Verification</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 3.0 GDPR, CCPA &amp; CPRA REGULATORY COMPLIANCE</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  We fully recognize the right of erasure ("Right to be Forgotten") and structural portability under European Union General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) guidelines:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-nocturnal-expedition/70 space-y-1">
                  <li><strong>Zero Selling:</strong> We never sell, auction, or syndicate ingested payload streams to data brokers.</li>
                  <li><strong>Instant Purge:</strong> Submit a programmatic schema deletion request via `/api/v1/compliance/purge`.</li>
                  <li><strong>Regional Boundaries:</strong> Specify geographical node pinning to keep data execution strictly within European boundaries (EU-only isolation).</li>
                </ul>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 4.0 COOKIES AND TELEMETRY LOGGING</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  Our application avoids tracking pixels or marketing analytics cookies. We use simple, encrypted browser cookie storage tokens solely to persist your authentication dashboard tokens and active state preferences.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-8 max-w-3xl">
              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 1.0 SOC 2 TYPE II CERTIFICATION &amp; SECURITY ASSURANCE</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  Our real-time platform underwent an independent, comprehensive security audit conducted by AICPA-approved assessors. Our systems adhere to SOC 2 Type II criteria across all standard parameters: security, availability, and processing integrity. The audit verifies that our network boundaries, system change management, and operational databases resist unauthorized external threat intrusion.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 2.0 ISO/IEC 27001 AUDITING CYCLES</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  We enforce a comprehensive Information Security Management System (ISMS) modeled on the latest ISO/IEC 27001 parameters. Daily automated scanning pipelines evaluate our container clusters against OWASP Top 10 vulnerabilities, vulnerability exposures, and Docker daemon secure privileges.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 3.0 HIPAA COMPLIANCE &amp; BAA READINESS</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  Healthcare providers utilizing our stream connectors to transmit Protected Health Information (PHI) can request the execution of our standard Business Associate Agreement (BAA). Our dedicated HIPAA-compliant data nodes guarantee full transaction logging with 7-year immutable storage retention, keeping audit logs securely isolated on encrypted, physical storage partitions.
                </p>
              </div>

              <div>
                <span className="font-mono text-xs text-deep-saffron font-bold block mb-2 uppercase">§ 4.0 COMPLIANCE MONITORING AND DRIFT ALERTS</span>
                <p className="text-sm md:text-base text-nocturnal-expedition/80 leading-relaxed">
                  If an anomalous configuration drift occurs on any regional ingestion server (such as out-of-order schema validation or unexpected socket handshakes), our cluster triggers an instant compliance alarm. Systems automatically divert traffic away from the affected node, isolating payloads and preserving strict regulatory custody chains.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info banner */}
        <div className="border-t border-mystic-mint/60 p-5 bg-arctic-powder shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-nocturnal-expedition/50 uppercase tracking-wider">
            Last Updated: June 26, 2026 // Regulatory Rev 4.12
          </span>
          <span className="font-mono text-[10px] text-green-700 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
            ✓ GDPR &amp; CCPA Compliant
          </span>
        </div>
      </div>
    </div>
  );
}

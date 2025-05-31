// IPS Generator - Investment Policy Statement Tool
// Professional financial planning application

class IPSGenerator {
    constructor() {
        this.clientData = {
            clientName: "Michael and Sarah Johnson",
            dateOfBirth: "1978-06-15",
            currentAge: 46,
            maritalStatus: "Married",
            numberOfDependents: 2,
            employmentStatus: "Employed",
            occupation: "Technology Director",
            annualIncome: 185000.00,
            netWorth: 1250000.00,
            liquidNetWorth: 675000.00,
            riskToleranceScore: 72,
            riskToleranceLevel: "Moderately Aggressive",
            riskCapacity: "High",
            lossTolerancePercentage: 25.0,
            volatilityComfort: 8,
            experienceLevel: "Advanced",
            primaryGoal: "Retirement",
            investmentHorizonYears: 19,
            targetAnnualReturn: 8.2,
            targetValue: 3500000.00,
            liquidityNeeds: "Medium",
            incomeRequirement: 0.00,
            inflationProtection: true,
            taxConsiderations: true,
            domesticEquityTarget: 55.0,
            internationalEquityTarget: 25.0,
            fixedIncomeTarget: 15.0,
            cashTarget: 3.0,
            alternativesTarget: 2.0,
            rebalancingThreshold: 5.0,
            rebalancingFrequency: "Quarterly",
            benchmarkIndex: "60% S&P 500 / 40% Bloomberg Aggregate Bond",
            reviewFrequency: "Quarterly",
            reportingFrequency: "Quarterly",
            performanceToleranceRange: 3.0,
            riskMetricTracking: "Standard Deviation, Sharpe Ratio, Maximum Drawdown, Beta",
            esgPreferences: true,
            excludedSectors: "Tobacco, Firearms",
            concentrationLimit: 8.0,
            minimumCreditRating: "A-",
            derivativesAllowed: false,
            advisorName: "Robert Chen, CFP®, CFA",
            advisorFirm: "Summit Wealth Advisors",
            custodianName: "Fidelity Investments",
            fiduciaryStatus: true,
            ipsCreationDate: "2024-05-30",
            nextReviewDate: "2024-11-30"
        };

        this.portfolioHoldings = [
            {
                accountNumber: "FID-7891234",
                accountType: "Taxable",
                holdingName: "Vanguard Total Stock Market ETF",
                ticker: "VTI",
                assetClass: "Domestic Equity",
                currentShares: 425.0,
                currentPrice: 245.67,
                currentValue: 104409.75,
                costBasis: 98500.00,
                currentAllocationPercentage: 15.5
            },
            {
                accountNumber: "FID-7891234",
                accountType: "Taxable",
                holdingName: "Vanguard FTSE Developed Markets ETF",
                ticker: "VEA",
                assetClass: "International Equity",
                currentShares: 1250.0,
                currentPrice: 48.23,
                currentValue: 60287.50,
                costBasis: 58750.00,
                currentAllocationPercentage: 9.0
            },
            {
                accountNumber: "FID-7891234",
                accountType: "Taxable",
                holdingName: "Vanguard Total Bond Market ETF",
                ticker: "BND",
                assetClass: "Fixed Income",
                currentShares: 750.0,
                currentPrice: 78.45,
                currentValue: 58837.50,
                costBasis: 62250.00,
                currentAllocationPercentage: 8.7
            },
            {
                accountNumber: "FID-78912345",
                accountType: "IRA",
                holdingName: "Fidelity 500 Index Fund",
                ticker: "FXAIX",
                assetClass: "Domestic Equity",
                currentShares: 2150.0,
                currentPrice: 156.78,
                currentValue: 337077.00,
                costBasis: 315000.00,
                currentAllocationPercentage: 50.0
            },
            {
                accountNumber: "FID-78912345",
                accountType: "IRA",
                holdingName: "Vanguard Emerging Markets ETF",
                ticker: "VWO",
                assetClass: "International Equity",
                currentShares: 2250.0,
                currentPrice: 41.32,
                currentValue: 92970.00,
                costBasis: 95000.00,
                currentAllocationPercentage: 13.8
            },
            {
                accountNumber: "FID-78912345",
                accountType: "IRA",
                holdingName: "Federal Money Market Fund",
                ticker: "SPAXX",
                assetClass: "Cash",
                currentShares: 20250.0,
                currentPrice: 1.00,
                currentValue: 20250.00,
                costBasis: 20250.00,
                currentAllocationPercentage: 3.0
            }
        ];

        this.assetClasses = {
            "Domestic Equity": { color: "#2962FF", target: 55.0, current: 65.5 },
            "International Equity": { color: "#1565C0", target: 25.0, current: 22.8 },
            "Fixed Income": { color: "#42A5F5", target: 15.0, current: 8.7 },
            "Cash": { color: "#90CAF9", target: 3.0, current: 3.0 },
            "Alternatives": { color: "#E3F2FD", target: 2.0, current: 0.0 }
        };

        this.allocationChart = null;
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.populateClientData();
        this.setupFormHandlers();
        this.calculateCurrentAllocations();
        this.updateAllocationDisplay();
        this.generateRebalancingRecommendations();
        this.updateDocumentPreview();
        
        // Initialize chart after DOM is ready
        setTimeout(() => {
            this.initializeChart();
        }, 100);
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-selected', 'true');

                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Refresh chart if allocation tab is activated
                if (targetTab === 'allocation' && this.allocationChart) {
                    setTimeout(() => {
                        this.allocationChart.resize();
                    }, 100);
                }
            });
        });
    }

    populateClientData() {
        // Populate dashboard elements
        document.getElementById('clientName').textContent = this.clientData.clientName;
        document.getElementById('clientAge').textContent = this.clientData.currentAge;
        document.getElementById('maritalStatus').textContent = this.clientData.maritalStatus;
        document.getElementById('annualIncome').textContent = this.formatCurrency(this.clientData.annualIncome);
        document.getElementById('netWorth').textContent = this.formatCurrency(this.clientData.netWorth);
        document.getElementById('investmentHorizon').textContent = `${this.clientData.investmentHorizonYears} years`;
        
        // Risk profile
        document.getElementById('riskScore').textContent = this.clientData.riskToleranceScore;
        document.getElementById('riskLabel').textContent = this.clientData.riskToleranceLevel;
        
        // Portfolio value
        const totalValue = this.portfolioHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
        document.getElementById('portfolioValue').textContent = this.formatCurrency(totalValue);

        // Populate form fields with proper attributes for validation
        const domesticInput = document.getElementById('domesticEquityTarget');
        const internationalInput = document.getElementById('internationalEquityTarget');
        const fixedInput = document.getElementById('fixedIncomeTarget');
        const cashInput = document.getElementById('cashTarget');
        const alternativesInput = document.getElementById('alternativesTarget');
        
        // Set min, max, and step attributes for proper validation
        [domesticInput, internationalInput, fixedInput, cashInput, alternativesInput].forEach(input => {
            input.setAttribute('min', '0');
            input.setAttribute('max', '100');
            input.setAttribute('step', '0.1');
        });
        
        document.getElementById('primaryGoal').value = this.clientData.primaryGoal;
        document.getElementById('targetReturn').value = this.clientData.targetAnnualReturn;
        document.getElementById('timeHorizon').value = this.clientData.investmentHorizonYears;
        domesticInput.value = this.clientData.domesticEquityTarget;
        internationalInput.value = this.clientData.internationalEquityTarget;
        fixedInput.value = this.clientData.fixedIncomeTarget;
        cashInput.value = this.clientData.cashTarget;
        alternativesInput.value = this.clientData.alternativesTarget;
        document.getElementById('rebalancingFrequency').value = this.clientData.rebalancingFrequency;
        document.getElementById('rebalancingThreshold').value = this.clientData.rebalancingThreshold;
        document.getElementById('reviewFrequency').value = this.clientData.reviewFrequency;
        document.getElementById('esgPreferences').checked = this.clientData.esgPreferences;
        document.getElementById('excludedSectors').value = this.clientData.excludedSectors;
        document.getElementById('concentrationLimit').value = this.clientData.concentrationLimit;
        document.getElementById('derivativesAllowed').checked = this.clientData.derivativesAllowed;
    }

    setupFormHandlers() {
        // Asset allocation inputs with enhanced validation
        const allocationInputs = document.querySelectorAll('.allocation-input');
        allocationInputs.forEach(input => {
            // Set up proper input validation
            input.addEventListener('input', (e) => {
                this.validateAndFormatInput(e.target);
                this.updateAllocationTargets();
                this.updateAllocationDisplay();
                this.generateRebalancingRecommendations();
                this.updateDocumentPreview();
                if (this.allocationChart) {
                    this.updateChart();
                }
            });

            // Prevent invalid input during typing
            input.addEventListener('keypress', (e) => {
                this.handleKeyPress(e);
            });

            // Validate on blur
            input.addEventListener('blur', (e) => {
                this.validateAndCleanInput(e.target);
            });
        });

        // Other form inputs
        const formInputs = document.querySelectorAll('#parameters input:not(.allocation-input), #parameters select');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateClientData();
                this.updateDocumentPreview();
            });
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.simulateDownload();
        });
    }

    validateAndFormatInput(input) {
        let value = input.value;
        
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit to 1 decimal place
        if (parts[1] && parts[1].length > 1) {
            value = parts[0] + '.' + parts[1].substring(0, 1);
        }
        
        // Update input value
        input.value = value;
        
        // Validate range
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            if (numValue > 100) {
                input.value = '100';
            } else if (numValue < 0) {
                input.value = '0';
            }
        }
    }

    handleKeyPress(e) {
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'];
        
        if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }
        
        // Prevent multiple decimal points
        if (e.key === '.' && e.target.value.includes('.')) {
            e.preventDefault();
        }
    }

    validateAndCleanInput(input) {
        let value = parseFloat(input.value);
        
        if (isNaN(value) || value === '') {
            input.value = '0';
            value = 0;
        }
        
        // Ensure value is within bounds
        if (value > 100) {
            input.value = '100';
        } else if (value < 0) {
            input.value = '0';
        } else {
            // Format to 1 decimal place if needed
            input.value = value.toFixed(1).replace(/\.0$/, '');
        }
    }

    updateAllocationTargets() {
        const domesticTarget = parseFloat(document.getElementById('domesticEquityTarget').value) || 0;
        const internationalTarget = parseFloat(document.getElementById('internationalEquityTarget').value) || 0;
        const fixedTarget = parseFloat(document.getElementById('fixedIncomeTarget').value) || 0;
        const cashTarget = parseFloat(document.getElementById('cashTarget').value) || 0;
        const alternativesTarget = parseFloat(document.getElementById('alternativesTarget').value) || 0;

        this.clientData.domesticEquityTarget = domesticTarget;
        this.clientData.internationalEquityTarget = internationalTarget;
        this.clientData.fixedIncomeTarget = fixedTarget;
        this.clientData.cashTarget = cashTarget;
        this.clientData.alternativesTarget = alternativesTarget;

        // Update asset classes
        this.assetClasses["Domestic Equity"].target = domesticTarget;
        this.assetClasses["International Equity"].target = internationalTarget;
        this.assetClasses["Fixed Income"].target = fixedTarget;
        this.assetClasses["Cash"].target = cashTarget;
        this.assetClasses["Alternatives"].target = alternativesTarget;

        // Update total display
        const total = domesticTarget + internationalTarget + fixedTarget + cashTarget + alternativesTarget;
        const totalElement = document.getElementById('allocationTotal');
        totalElement.textContent = total.toFixed(1);
        
        // Change color based on total
        if (Math.abs(total - 100) < 0.1) {
            totalElement.style.color = 'var(--color-success)';
            totalElement.classList.remove('invalid-total');
        } else {
            totalElement.style.color = 'var(--color-error)';
            totalElement.classList.add('invalid-total');
        }
    }

    updateClientData() {
        this.clientData.primaryGoal = document.getElementById('primaryGoal').value;
        this.clientData.targetAnnualReturn = parseFloat(document.getElementById('targetReturn').value);
        this.clientData.investmentHorizonYears = parseInt(document.getElementById('timeHorizon').value);
        this.clientData.rebalancingFrequency = document.getElementById('rebalancingFrequency').value;
        this.clientData.rebalancingThreshold = parseFloat(document.getElementById('rebalancingThreshold').value);
        this.clientData.reviewFrequency = document.getElementById('reviewFrequency').value;
        this.clientData.esgPreferences = document.getElementById('esgPreferences').checked;
        this.clientData.excludedSectors = document.getElementById('excludedSectors').value;
        this.clientData.concentrationLimit = parseFloat(document.getElementById('concentrationLimit').value);
        this.clientData.derivativesAllowed = document.getElementById('derivativesAllowed').checked;
    }

    calculateCurrentAllocations() {
        const totalValue = this.portfolioHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
        
        const allocations = {
            "Domestic Equity": 0,
            "International Equity": 0,
            "Fixed Income": 0,
            "Cash": 0,
            "Alternatives": 0
        };

        this.portfolioHoldings.forEach(holding => {
            if (allocations.hasOwnProperty(holding.assetClass)) {
                allocations[holding.assetClass] += holding.currentValue;
            }
        });

        // Convert to percentages and update asset classes
        Object.keys(allocations).forEach(assetClass => {
            const percentage = (allocations[assetClass] / totalValue) * 100;
            this.assetClasses[assetClass].current = percentage;
        });
    }

    updateAllocationDisplay() {
        // Update allocation table
        document.getElementById('currentDomestic').textContent = `${this.assetClasses["Domestic Equity"].current.toFixed(1)}%`;
        document.getElementById('targetDomestic').textContent = `${this.assetClasses["Domestic Equity"].target.toFixed(1)}%`;
        document.getElementById('currentInternational').textContent = `${this.assetClasses["International Equity"].current.toFixed(1)}%`;
        document.getElementById('targetInternational').textContent = `${this.assetClasses["International Equity"].target.toFixed(1)}%`;
        document.getElementById('currentFixed').textContent = `${this.assetClasses["Fixed Income"].current.toFixed(1)}%`;
        document.getElementById('targetFixed').textContent = `${this.assetClasses["Fixed Income"].target.toFixed(1)}%`;
        document.getElementById('currentCash').textContent = `${this.assetClasses["Cash"].current.toFixed(1)}%`;
        document.getElementById('targetCash').textContent = `${this.assetClasses["Cash"].target.toFixed(1)}%`;
        document.getElementById('currentAlternatives').textContent = `${this.assetClasses["Alternatives"].current.toFixed(1)}%`;
        document.getElementById('targetAlternatives').textContent = `${this.assetClasses["Alternatives"].target.toFixed(1)}%`;

        // Update variance columns
        this.updateVarianceDisplay('varianceDomestic', 'Domestic Equity');
        this.updateVarianceDisplay('varianceInternational', 'International Equity');
        this.updateVarianceDisplay('varianceFixed', 'Fixed Income');
        this.updateVarianceDisplay('varianceCash', 'Cash');
        this.updateVarianceDisplay('varianceAlternatives', 'Alternatives');
    }

    updateVarianceDisplay(elementId, assetClass) {
        const element = document.getElementById(elementId);
        const variance = this.assetClasses[assetClass].current - this.assetClasses[assetClass].target;
        
        element.textContent = `${variance >= 0 ? '+' : ''}${variance.toFixed(1)}%`;
        
        // Update class based on variance
        element.className = '';
        if (Math.abs(variance) < 0.1) {
            element.classList.add('variance-neutral');
        } else if (variance > 0) {
            element.classList.add('variance-positive');
        } else {
            element.classList.add('variance-negative');
        }
    }

    initializeChart() {
        const ctx = document.getElementById('allocationChart');
        if (!ctx) return;

        const currentData = Object.values(this.assetClasses).map(ac => ac.current);
        const targetData = Object.values(this.assetClasses).map(ac => ac.target);
        const labels = Object.keys(this.assetClasses);
        const colors = Object.values(this.assetClasses).map(ac => ac.color);

        this.allocationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Current Allocation',
                        data: currentData,
                        backgroundColor: colors,
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    },
                    {
                        label: 'Target Allocation',
                        data: targetData,
                        backgroundColor: colors.map(color => color + '80'),
                        borderWidth: 1,
                        borderColor: '#ffffff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const dataset = context.datasetIndex === 0 ? 'Current' : 'Target';
                                return `${label} (${dataset}): ${value.toFixed(1)}%`;
                            }
                        }
                    }
                },
                cutout: '40%'
            }
        });
    }

    updateChart() {
        if (!this.allocationChart) return;

        const currentData = Object.values(this.assetClasses).map(ac => ac.current);
        const targetData = Object.values(this.assetClasses).map(ac => ac.target);
        
        this.allocationChart.data.datasets[0].data = currentData;
        this.allocationChart.data.datasets[1].data = targetData;
        this.allocationChart.update();
    }

    generateRebalancingRecommendations() {
        const totalValue = this.portfolioHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
        const recommendations = [];

        Object.keys(this.assetClasses).forEach(assetClass => {
            const current = this.assetClasses[assetClass].current;
            const target = this.assetClasses[assetClass].target;
            const variance = current - target;
            
            if (Math.abs(variance) > this.clientData.rebalancingThreshold) {
                const dollarAmount = Math.abs((variance / 100) * totalValue);
                const action = variance > 0 ? 'SELL' : 'BUY';
                const description = variance > 0 
                    ? `Reduce overweight position by ${Math.abs(variance).toFixed(1)}%`
                    : assetClass === 'Alternatives' && current === 0
                        ? `Add alternatives allocation per target ${target.toFixed(1)}%`
                        : `Increase allocation to target ${target.toFixed(1)}%`;

                recommendations.push({
                    action,
                    assetClass,
                    amount: dollarAmount,
                    description,
                    priority: Math.abs(variance)
                });
            }
        });

        // Sort by priority (largest variance first)
        recommendations.sort((a, b) => b.priority - a.priority);

        this.updateRebalancingDisplay(recommendations);
    }

    updateRebalancingDisplay(recommendations) {
        const container = document.querySelector('.recommendation-list');
        if (!container) return;

        container.innerHTML = '';

        recommendations.forEach(rec => {
            const item = document.createElement('div');
            item.className = `recommendation-item ${rec.action.toLowerCase()}`;
            
            item.innerHTML = `
                <div class="recommendation-header">
                    <span class="action-type">${rec.action}</span>
                    <span class="asset-name">${rec.assetClass}</span>
                </div>
                <div class="recommendation-details">
                    <span class="amount">${this.formatCurrency(rec.amount)}</span>
                    <span class="description">${rec.description}</span>
                </div>
            `;
            
            container.appendChild(item);
        });

        if (recommendations.length === 0) {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.innerHTML = `
                <div class="recommendation-header">
                    <span class="action-type" style="background: var(--color-success);">BALANCED</span>
                    <span class="asset-name">Portfolio</span>
                </div>
                <div class="recommendation-details">
                    <span class="description">Portfolio is within rebalancing thresholds</span>
                </div>
            `;
            container.appendChild(item);
        }
    }

    updateDocumentPreview() {
        // Update document with current data
        document.getElementById('docClientName').textContent = this.clientData.clientName;
        document.getElementById('docDate').textContent = new Date(this.clientData.ipsCreationDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('docPrimaryGoal').textContent = this.clientData.primaryGoal.toLowerCase();
        document.getElementById('docTimeHorizon').textContent = `${this.clientData.investmentHorizonYears} years`;
        document.getElementById('docTargetReturn').textContent = `${this.clientData.targetAnnualReturn}%`;
        
        // Asset allocation targets
        document.getElementById('docDomesticTarget').textContent = `${this.clientData.domesticEquityTarget}%`;
        document.getElementById('docInternationalTarget').textContent = `${this.clientData.internationalEquityTarget}%`;
        document.getElementById('docFixedTarget').textContent = `${this.clientData.fixedIncomeTarget}%`;
        document.getElementById('docCashTarget').textContent = `${this.clientData.cashTarget}%`;
        document.getElementById('docAlternativesTarget').textContent = `${this.clientData.alternativesTarget}%`;
        
        // Rebalancing and monitoring
        document.getElementById('docRebalancingFreq').textContent = this.clientData.rebalancingFrequency.toLowerCase();
        document.getElementById('docRebalancingThreshold').textContent = `${this.clientData.rebalancingThreshold}%`;
        document.getElementById('docReviewFreq').textContent = this.clientData.reviewFrequency.toLowerCase();
        
        // Investment restrictions
        document.getElementById('docConcentrationLimit').textContent = `${this.clientData.concentrationLimit}%`;
        document.getElementById('docExcludedSectors').textContent = this.clientData.excludedSectors;
    }

    simulateDownload() {
        // Show loading state
        const btn = document.getElementById('downloadBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" dur="1s" values="32;0;32" repeatCount="indefinite"/>
                </circle>
            </svg>
            Generating PDF...
        `;
        btn.disabled = true;

        // Simulate download process
        setTimeout(() => {
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Download Complete
            `;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 3000);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Utility functions for enhanced functionality
class IPSUtils {
    static validateAllocationTotal(allocations) {
        const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
        return Math.abs(total - 100) < 0.01;
    }

    static calculateRebalancingTaxImpact(portfolioHoldings, recommendations) {
        let taxImpact = 0;
        
        portfolioHoldings.forEach(holding => {
            if (holding.accountType === 'Taxable') {
                const gain = holding.currentValue - holding.costBasis;
                if (gain > 0) {
                    // Simplified capital gains calculation
                    taxImpact += gain * 0.15; // Assuming 15% capital gains rate
                }
            }
        });
        
        return taxImpact;
    }

    static generateRiskAssessment(riskScore, age, timeHorizon) {
        let assessment = "";
        
        if (riskScore < 30) {
            assessment = "Conservative investor with primary focus on capital preservation";
        } else if (riskScore < 50) {
            assessment = "Moderate investor seeking balanced growth with managed risk";
        } else if (riskScore < 70) {
            assessment = "Moderately aggressive investor comfortable with market volatility";
        } else {
            assessment = "Aggressive investor seeking maximum growth potential";
        }
        
        return assessment;
    }

    static calculateProjectedValue(currentValue, returnRate, years) {
        return currentValue * Math.pow(1 + (returnRate / 100), years);
    }
}

// Enhanced form validation
class FormValidator {
    static validateNumericInput(input, min = 0, max = 100) {
        const value = parseFloat(input.value);
        
        if (isNaN(value) || value < min || value > max) {
            input.classList.add('invalid');
            return false;
        }
        
        input.classList.remove('invalid');
        return true;
    }

    static validateAllocationInputs() {
        const inputs = document.querySelectorAll('.allocation-input');
        let total = 0;
        let allValid = true;
        
        inputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            total += value;
            
            if (!this.validateNumericInput(input, 0, 100)) {
                allValid = false;
            }
        });
        
        // Check if total equals 100%
        const totalElement = document.getElementById('allocationTotal');
        if (Math.abs(total - 100) > 0.01) {
            totalElement.classList.add('invalid-total');
            allValid = false;
        } else {
            totalElement.classList.remove('invalid-total');
        }
        
        return allValid;
    }
}

// Performance monitoring and analytics
class PerformanceMonitor {
    constructor() {
        this.loadStartTime = performance.now();
        this.userInteractions = 0;
        this.tabSwitches = 0;
    }

    recordTabSwitch() {
        this.tabSwitches++;
    }

    recordUserInteraction() {
        this.userInteractions++;
    }

    getLoadTime() {
        return performance.now() - this.loadStartTime;
    }

    generateUsageReport() {
        return {
            loadTime: this.getLoadTime(),
            userInteractions: this.userInteractions,
            tabSwitches: this.tabSwitches,
            timestamp: new Date().toISOString()
        };
    }
}

// Accessibility enhancements
class AccessibilityManager {
    static init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
    }

    static setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + 1-5 for tab navigation
            if (e.altKey && e.key >= '1' && e.key <= '5') {
                e.preventDefault();
                const tabIndex = parseInt(e.key) - 1;
                const tabs = document.querySelectorAll('.tab-button');
                if (tabs[tabIndex]) {
                    tabs[tabIndex].click();
                    tabs[tabIndex].focus();
                }
            }
            
            // Escape to close modals or return to main navigation
            if (e.key === 'Escape') {
                const activeTab = document.querySelector('.tab-button.active');
                if (activeTab) {
                    activeTab.focus();
                }
            }
        });
    }

    static setupScreenReaderSupport() {
        // Add live regions for dynamic content updates
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-announcements';
        document.body.appendChild(liveRegion);
    }

    static setupFocusManagement() {
        // Ensure focus is maintained when switching tabs
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Announce tab change to screen readers
                this.announceToScreenReader(`Switched to ${button.textContent.trim()} tab`);
            });
        });
    }

    static announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
            // Clear the message after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main IPS Generator
    const ipsGenerator = new IPSGenerator();
    
    // Initialize performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    
    // Initialize accessibility features
    AccessibilityManager.init();
    
    // Set up global event listeners for monitoring
    document.addEventListener('click', () => {
        performanceMonitor.recordUserInteraction();
    });
    
    document.addEventListener('change', () => {
        performanceMonitor.recordUserInteraction();
    });
    
    // Tab switch monitoring
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            performanceMonitor.recordTabSwitch();
        });
    });
    
    // Progressive enhancement for older browsers
    if (!window.CSS || !CSS.supports('display', 'grid')) {
        document.body.classList.add('legacy-browser');
        console.warn('Legacy browser detected. Some features may be limited.');
    }
    
    // Performance logging
    window.addEventListener('load', () => {
        const loadTime = performanceMonitor.getLoadTime();
        console.log(`IPS Generator loaded in ${Math.round(loadTime)}ms`);
    });
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
        AccessibilityManager.announceToScreenReader('An error occurred. Please refresh the page.');
    });
    
    // Expose utilities for testing
    window.IPSGenerator = ipsGenerator;
    window.IPSUtils = IPSUtils;
    window.FormValidator = FormValidator;
    window.PerformanceMonitor = performanceMonitor;
});

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IPSGenerator, IPSUtils, FormValidator, PerformanceMonitor, AccessibilityManager };
}
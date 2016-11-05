using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.Mappings;
using System.Data.Entity;

namespace LuminosityWebAPI.Infra.DataContexts
{
    public class LuminosityWebApiDataContext : DbContext
    {
        public LuminosityWebApiDataContext()
            : base("LuminosityWebApiConnectionString")
        {
            Database.SetInitializer<LuminosityWebApiDataContext>(new LuminosityWebApiDataContextInitializer());
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }

        // - API
        public DbSet<Cliente> Clientes { get; set; }
        /*public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }*/

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ClienteMap());
            /*modelBuilder.Configurations.Add(new FuncionarioMap()); 
            modelBuilder.Configurations.Add(new VeiculoMap());
            modelBuilder.Configurations.Add(new PedidoMap());*/
            base.OnModelCreating(modelBuilder);
        }
    }

    public class LuminosityWebApiDataContextInitializer : DropCreateDatabaseIfModelChanges<LuminosityWebApiDataContext>
    {
        protected override void Seed(LuminosityWebApiDataContext context)
        {

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_CPF ON Cliente (CLI_STR_CPF)");
            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_EMAIL ON Cliente (CLI_STR_EMAIL)");
            context.Clientes.Add(new Cliente { CLI_INT_ID = 1, CLI_STR_NOME = "José", CLI_STR_SOBRENOME = "Souto", CLI_STR_EMAIL = "jose@gmail.com", CLI_STR_CPF = "44455566601", CLI_STR_TEL = "9999-5555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Campos Cerrados, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 2, CLI_STR_NOME = "João", CLI_STR_SOBRENOME = "Rodrigues", CLI_STR_EMAIL = "joao@gmail.com", CLI_STR_CPF = "44455566602", CLI_STR_TEL = "9999-5555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Tatuapé, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 3, CLI_STR_NOME = "Maria", CLI_STR_SOBRENOME = "Pozzi", CLI_STR_EMAIL = "maria@gmail.com", CLI_STR_CPF = "44455566603", CLI_STR_TEL = "9999-55555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Belém, 510" });
            context.SaveChanges();

            base.Seed(context);

        }
    }
}

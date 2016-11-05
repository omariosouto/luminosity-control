using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.DataContexts;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LuminosityWebAPI.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/public")]
    public class ClienteController: ApiController
    {
        private LuminosityWebApiDataContext db = new LuminosityWebApiDataContext();

        // Listar todos
        [Route("clientes")]
        public HttpResponseMessage GetClientes()
        {
            var result = db.Clientes.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}